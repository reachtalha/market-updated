'use client';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import UploadImageView from '@/components/common/Blog/UploadImageView';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { getBase64 } from '@/components/common/functions';
import UploadImage from '@/utils/handlers/image/UploadImage';
import { Timestamp, addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(2).max(100),
  coverImage: z.string(),
  thumbnailImage: z.string()
});

type NewBlogFormProps = {
  slug?: string;
  blogData?: {
    title: string;
    content: any;
    coverImage: string;
    thumbnailImage: string;
    status: string;
  };
};
export default function NewBlogForm({ slug, blogData }: NewBlogFormProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blogData?.title || '',
      coverImage: blogData?.coverImage || '',
      thumbnailImage: blogData?.thumbnailImage || ''
    },
    shouldUnregister: false
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const blocks = await ref.current?.save();
    try {
      setIsPublishing(true);
      const obj = {
        title: values?.title,
        coverImage: values?.coverImage,
        thumbnailImage: values?.thumbnailImage,
        content: blocks,
        status: 'Active',
        uid: auth.currentUser?.uid,
        postedAt: Timestamp.fromDate(new Date())
      };
      const docRef = slug
        ? await updateDoc(doc(db, 'blog-posts', slug), obj)
        : await addDoc(collection(db, 'blog-posts'), obj);
      toast.success(`Your blog has been ${slug ? 'updated' : 'published'}!`);
      router.push(`/blogs/${docRef?.id ?? slug}`);
    } catch (err) {
      toast.success('Something went wrong. We are unable to publish your blog!');
    } finally {
      setIsPublishing(false);
    }
  }

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = await require('@editorjs/header');
    const Image = await require('@editorjs/image');
    const Embed = await require('@editorjs/embed');
    const Table = await require('@editorjs/table');
    const List = await require('@editorjs/list');
    const Code = await require('@editorjs/code');
    const LinkTool = await require('@editorjs/link');
    const InlineCode = await require('@editorjs/inline-code');

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Write here...',
        inlineToolbar: true,
        data: blogData?.content || [],
        tools: {
          header: {
            class: Header,
            inlineToolbar: ['link'],

            config: {
              placeholder: 'Header'
            },
            shortcut: 'CMD+SHIFT+H'
          },
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile: async (file: any) => {
                  const base64Image = await getBase64(file);
                  const url = await UploadImage({
                    collection: 'blogs',
                    image: base64Image,
                    name: 'blog-' + new Date().getTime()
                  });
                  return {
                    success: 1,
                    file: {
                      url
                    }
                  };
                }
              }
            }
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                instagram: true
              }
            }
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <UploadImageView
                      isLoading={coverUploading}
                      setIsLoading={setCoverUploading}
                      value={field.value}
                      onUploadSuccess={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="thumbnailImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail Image</FormLabel>
                <FormControl>
                  <UploadImageView
                    isLoading={thumbnailUploading}
                    setIsLoading={setThumbnailUploading}
                    value={field.value}
                    onUploadSuccess={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full mt-7">
          <h3 className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
            Write here
          </h3>
          <div className="prose  prose-stone max-w-none  w-full dark:prose-invert">
            <div id="editor" className=" p-5 bg-white shadow-sm rounded-lg border" />
            <p className="text-sm text-gray-500">
              Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to
              open the command menu.
            </p>
          </div>
        </div>
        <Button type="submit" className="w-56" disabled={isPublishing || coverUploading}>
          {slug
            ? isPublishing
              ? 'Updating...'
              : 'Update'
            : isPublishing
            ? 'Publishing...'
            : 'Publish'}
        </Button>
      </form>
    </Form>
  );
}
