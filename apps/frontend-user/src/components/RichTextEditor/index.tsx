"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";

export default function RichTextEditor({ content, onChange }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Prevent conflict with StarterKit's default heading configuration
      }),
      Heading.configure({
        levels: [1, 2, 3], // Define heading levels
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"], // Support text alignment for these types
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      Highlight, // Enable highlighting
      Image, // Enable image support
      ImageResize, // Enable image resizing
    ],
    content: content, // Initial content for the editor
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML()); // Debugging: log editor content
      onChange(editor.getHTML()); // Pass updated content to the parent component
    },
  });

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
