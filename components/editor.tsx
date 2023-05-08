"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "./ui/button";
import EditorJS from "@editorjs/editorjs";

interface EditorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Editor = ({ ...props }: EditorProps) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const ref = React.useRef<EditorJS>();

  const initializeEditor = React.useCallback(async () => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
      });
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) initializeEditor();
  }, [isMounted]);

  return (
    <div className="border-slate-200 rounded p-6 border">
      <div className="flex justify-between items-center">
        <p className="text-slate-700 font-semibold md:text-lg">Create Post</p>
        <button
          className={cn(buttonVariants({ size: "sm" }), "px-4")}
          {...props}
        >
          Back
        </button>
      </div>
      <div className="prose prose-stone dark:prose-invert mt-4">
        <input
          autoFocus
          id="title"
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none mb-4"
        />
        <div id="editor" />
        <p className="text-sm text-gray-500 mt-4">
          Use{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>
    </div>
  );
};

export default Editor;
