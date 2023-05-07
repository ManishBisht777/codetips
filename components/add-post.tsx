import React from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface addPostProps {}

function AddPost({}: addPostProps) {
  return (
    <div className="border gap-8 rounded-md p-6 text-center border-dashed min-h-[6rem] flex flex-col justify-center items-center">
      <div className="p-3 w-16 h-16 flex justify-center items-center rounded-full bg-slate-100">
        <Icons.post className="" />
      </div>
      <div>
        <p className="font-semibold md:text-xl text-lg">Share a tip</p>
        <p className="text-slate-600 text-sm">
          Some lines of code may not be helpful for you but can be helpful for
          others so make sure to share them
        </p>
      </div>

      {/* toggle create post modal */}
      <button className={cn(buttonVariants(), "flex")}>
        <Icons.add className="mr-1 w-4" />
        Create post
      </button>
    </div>
  );
}

export default AddPost;
