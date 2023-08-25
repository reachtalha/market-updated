"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';

import UploadImageView from '@/components/common/Blog/UploadImageView';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BoxedContent from '@/components/common/BoxedContent';
import { useCallback, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { getBase64 } from '@/components/common/functions';
import UploadImage from '@/utils/handlers/image/UploadImage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(2).max(100),
  coverImage: z.string(),
  thumbnailImage: z.string(),
})

const fetchUpdateBlogPost = async (blogPostId: string, data: any) => {
  return await setDoc(doc(db, "blog-posts", blogPostId), {
    title: data?.title,
    content: data?.content,
    coverImage: data?.coverImage,
    thumbnailImage: data?.thumbnailImage,
    status: data?.status,
    userId: auth.currentUser?.uid,
  });
};

type NewBlogFormProps = {
  slug: string
 blogData: {
   title: string
   content: any,
   coverImage: string,
   thumbnailImage: string,
   status: string,
 }
}
export default function NewBlogForm({ slug, blogData }: NewBlogFormProps ){
  // const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blogData?.title || "",
      coverImage: blogData?.coverImage || "",
      thumbnailImage: blogData?.thumbnailImage || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const blocks = await ref.current?.save();
    try {
      setIsPublishing(true);
      await fetchUpdateBlogPost(slug, {
        title: values?.title,
        coverImage: values?.coverImage,
        thumbnailImage: values?.thumbnailImage,
        content: blocks,
        status: "Active"
      });
      toast.success('Your blog has been published!');
    }catch(err){
      console.log(err);
    }finally {
      setIsPublishing(false);
    }
  }

  console.log({ blogData })

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
                  })
                  return {
                    success: 1,
                    file: {
                      url,
                    }
                  }
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
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => {
            console.log({ field })
            return <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <UploadImageView value={field.value} onUploadSuccess={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}
        />

        <FormField
          control={form.control}
          name="thumbnailImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <UploadImageView value={field.value} onUploadSuccess={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full mt-7">
          <h3 className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">Write here</h3>
          <div className="prose  prose-stone max-w-none  w-full dark:prose-invert">
            <div id="editor" className=" p-5 bg-white shadow-sm rounded-lg border" />
            <p className="text-sm text-gray-500">
              Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
              the command menu.
            </p>
          </div>
        </div>

        <div className="fixed p-0 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <BoxedContent className="h-full w-full flex items-center justify-end">
            <div className="flex gap-2 ">
              {/*<Button type="submit">{*/}
              {/*  isSaving ? 'Saving' : 'Save'*/}
              {/*}</Button>*/}
              <Button type="submit">{
                isPublishing ? 'Publishing' : 'Publish'
              }</Button>
            </div>

          </BoxedContent>
        </div>
      </form>
    </Form>
  )
}