"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "./ui/button";
import EditorJS from "@editorjs/editorjs";
import { Icons } from "./icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/lib/validation/post";
import { z } from "zod";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import usePosts from "@/hooks/usePost";
import { Textarea } from "./ui/textarea";
type FormData = z.infer<typeof postSchema>;

interface EditorProps {
  setToggleCreatePostModal: React.Dispatch<React.SetStateAction<any>>;
  toggleCreatePostModal: boolean;
}

const Editor = ({
  setToggleCreatePostModal,
  toggleCreatePostModal,
}: EditorProps) => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const { mutate: mutateAllPosts } = usePosts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  });

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    // const List = (await import("@editorjs/list")).default;
    // const Code = (await import("@editorjs/code")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: {
          header: Header,
        },
      });
    }
  }, []);

  React.useEffect(() => {
    if (toggleCreatePostModal && isMounted) initializeEditor();
    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [toggleCreatePostModal, initializeEditor, isMounted]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    const blocks = await ref.current?.save();

    const response = await fetch(`/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        shortdescription: data.shortdescription,
        content: blocks,
      }),
    });

    setIsSaving(false);
    setToggleCreatePostModal(false);
    mutateAllPosts();

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      description: "Your post has been saved.",
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form
      className="border-slate-200 rounded p-6 border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center">
        <button
          className="text-slate-700 font-semibold md:text-lg"
          type="button"
          onClick={() => setToggleCreatePostModal(false)}
        >
          <Icons.chevronLeft />
        </button>
        <button
          type="submit"
          className={cn(buttonVariants({ size: "sm" }), "px-4 flex")}
        >
          {isSaving && <Icons.spinner className=" animate-spin mr-2" />}
          Save
        </button>
      </div>
      {errors?.title && (
        <p className="px-1 text-xs text-red-600">{errors.title?.message}</p>
      )}
      <div className="prose prose-stone dark:prose-invert mt-4">
        <input
          autoFocus
          id="title"
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none mb-4"
          {...register("title")}
        />
        <Textarea
          placeholder="Short Description of Post"
          className="my-2"
          {...register("shortdescription")}
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
    </form>
  );
};

export default Editor;
