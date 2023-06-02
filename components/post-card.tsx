"use client";

import { PostWithUser } from "@/types";
import React from "react";
import { Icons } from "./icons";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "./ui/use-toast";

export default function PostCard(postData: PostWithUser) {
  const handleLike = async () => {
    const isLiked = postData.likedIds.includes(postData.authorId);

    const response = await fetch(`/api/post/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postData.id,
        isLiked: isLiked,
      }),
    });

    if (response.ok) {
      return toast({
        description: "Liked updated",
      });
    } else {
      return toast({
        title: "Some error occured",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-4 border-b p-4">
      <Avatar className="w-12 h-12">
        <AvatarImage
          className="rounded-full overflow-hidden h-fit"
          src={postData.author.image || ""}
        />
        <AvatarFallback>{postData.author.name}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <p className="text-slate-800 font-medium">{postData.author.name}</p>
          <p className="text-slate-500 text-sm">@manishbisht9711</p>
        </div>
        <Link
          href={`/post/${postData.id}`}
          className="text-slate-900 font-bold text-xl"
        >
          {postData.title}
        </Link>
        <p className="text-sm text-slate-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
          doloribus consectetur qui odio consectetur adipisicing elit ...
        </p>
        <div className="flex gap-6 mt-4 text-slate-600">
          <button className="cursor-pointer relative">
            <Icons.like
              strokeWidth={1}
              className="w-5 hover:fill-pink-400 hover:stroke-white transition-all"
            />
            <p className="sr-only">Like</p>
          </button>
          <button className="cursor-pointer">
            <Icons.bookmark
              className="w-5 hover:stroke-blue-500 transition-all"
              strokeWidth={1}
            />
            <p className="sr-only">Bookmark</p>
          </button>
          <button className="cursor-pointer">
            <Icons.share
              className="w-5 hover:stroke-slate-800 transition-all"
              strokeWidth={1}
            />
            <p className="sr-only">Share</p>
          </button>
        </div>
      </div>
    </div>
  );
}
