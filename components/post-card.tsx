import { PostWithUser } from "@/types";
import Image from "next/image";
import React from "react";
import { Icons } from "./icons";
import Link from "next/link";

export default function PostCard(postData: PostWithUser) {
  console.log(postData);
  return (
    <div className="flex gap-4 border-b p-4">
      <Image
        src={postData.author.image}
        width={50}
        height={50}
        alt="author image"
        className="rounded-full overflow-hidden h-fit"
      />

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
          <button className="cursor-pointer">
            <Icons.like className="w-5" strokeWidth={1} />
          </button>
          <button className="cursor-pointer">
            <Icons.bookmark className="w-5" strokeWidth={1} />
          </button>
          <button className="cursor-pointer">
            <Icons.share className="w-5 " strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  );
}
