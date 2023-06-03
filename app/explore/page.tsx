import AddPost from "@/components/add-post";
import PostList from "@/components/post-list";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const user = await getCurrentUser();

  return (
    <div className="flex gap-8 mt-16">
      <div className="w-full px-10 py-2 flex flex-col">
        {user ? (
          <AddPost />
        ) : (
          <div className="w-full h-[30vh] border rounded-sm flex justify-center items-center flex-col">
            <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1]">
              Oops you have to login
            </h1>
            <p className="max-w-[750px] text-sm text-muted-foreground mt-1">
              Login to share code
            </p>
            <Link href="/login" className={cn(buttonVariants(), "px-6 mt-4")}>
              Login
            </Link>
          </div>
        )}
        <PostList />
      </div>
      <div className="fixed top-14 z-30 hidden h-[calc(100vh-10rem)] w-[260px] shrink-0 overflow-y-auto py-6 pr-2 md:sticky md:block lg:py-10">
        What do i put here?
      </div>
    </div>
  );
};

export default Page;
