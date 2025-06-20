"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "@/components/_shared/rich-text-editor/Toolbar";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";
import Placeholder from "@tiptap/extension-placeholder";

export default function BaseRichTextEditor({ content, onChange, placeholder = "" }) {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass: "text-black md:text-sm text-xs",
        emptyNodeClass: "text-black md:text-sm text-xs",
      }),
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
      Image,
      ImageResize,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] rounded-md bg-slate-50 py-2 px-3 rich-editor aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] selection:bg-primary selection:text-primary-foreground  w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:ring-1 focus:ring-[#ADADAD] border-[#ADADAD]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} placeholder="Masukkan deskripsi produk" />
    </div>
  );
}
