"use client"
import {useState, useRef, useEffect, useCallback } from 'react';
import BoxedContent from '@/components/common/BoxedContent';
import EditorJS from '@editorjs/editorjs';
import UploadImage from '@/utils/handlers/image/UploadImage';
import { getBase64 } from '@/components/common/functions';
import NewBlogForm from '@/components/common/Blog/NewBlogForm';

export default function NewPost(){
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
      <BoxedContent className="py-24">
        <NewBlogForm />
        <div className="w-full mt-7">
          <h3 className="text-2xl mb-2">Write here</h3>
          <div className="prose  prose-stone max-w-none  w-full dark:prose-invert">
            <div id="editor" className=" p-5 bg-white shadow-sm rounded-lg border" />
            <p className="text-sm text-gray-500">
              Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
              the command menu.
            </p>
          </div>
        </div>
      </BoxedContent>
  )
}
