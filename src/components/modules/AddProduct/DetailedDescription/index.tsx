import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import Title from '@/components/common/Seller/Shared/Title';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const Index = ({ setStep }: Props) => {
  const { setValue, getValues, register } = useFormContext();

  const ref = React.useRef<EditorJS>();

  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = await require('@editorjs/header');
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
        placeholder: 'Type product details here',
        inlineToolbar: true,
        data: getValues('detailedDescription') || '',
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

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <>
      <Title title="Detailed Description" />
      <div className="w-full mt-2">
        <div className="prose prose-stone mx-auto w-full dark:prose-invert">
          <div id="editor" className=" p-5 bg-white shadow-sm rounded-lg border" />
          <p className="text-sm text-gray-500">
            Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
            the command menu.
          </p>
        </div>
      </div>
      <div className="flex gap-x-2 mt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={async () => {
            const blocks = await ref.current?.save();
            setValue('detailedDescription', blocks);
            setStep((prev) => prev - 1);
          }}
          className="w-1/2"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={async () => {
            const blocks = await ref.current?.save();

            setValue('detailedDescription', blocks);
            setStep((prev) => prev + 1);
          }}
          className="w-1/2"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Index;
