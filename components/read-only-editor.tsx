"use client";

import React from "react";
import { postSchema } from "@/lib/validation/post";
import EditorJS from "@editorjs/editorjs";
import { PostWithUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface ReadOnlyPostProps {
  post: PostWithUser;
}

const ReadOnlyPost = ({ post }: ReadOnlyPostProps) => {
  const ref = React.useRef<EditorJS>();

  console.log(post);

  const initializeEditor = async () => {
    const body = postSchema.parse(post);
    const Header = (await import("@editorjs/header")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        readOnly: true,
        onReady() {
          ref.current = editor;
        },
        data: body.content,
        tools: {
          header: Header,
        },
      });
    }
  };

  React.useEffect(() => {
    initializeEditor();
  });

  return (
    <div className="mt-10 flex flex-col items-center text-center max-w-[720px]">
      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:text-3xl lg:leading-[1.1]">
        {post.title}
      </h1>
      <p className="md:text-lg text-sm text-slate-600 md:mt-4 mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim doloribus
        consectetur qui odio consectetur adipisicing elit ...
      </p>
      <div className="flex gap-4 my-5">
        <Avatar>
          <AvatarImage
            src={post.author.image || ""}
            className="w-10 h-10 rounded-full"
          />
          <AvatarFallback>{post.author.name}</AvatarFallback>
        </Avatar>
        <div className="flex gap-2 items-center">
          <p className="text-slate-800 font-medium">{post.author.name}</p>
          <p className="text-slate-500 text-sm">@manishbisht9711</p>
        </div>
      </div>
      <div className="text-sm px-4" id="editor"></div>
    </div>
  );
};

export default ReadOnlyPost;
