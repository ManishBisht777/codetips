import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { Post, User } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PostPageProps {
  params: { postId: string };
}

async function getPostById(postId: Post["id"], userId: User["id"]) {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  return {
    post: { ...post },
    isCurrentUser: post?.authorId === userId,
  };
}

const page = async ({ params }: PostPageProps) => {
  const user = await getCurrentUser();

  const post = await getPostById(params.postId, user?.id || "");

  if (!post) {
    notFound();
  }

  console.log(post);

  return (
    <div className="container flex flex-col">
      <div className="flex w-full items-center justify-between mt-6">
        <div className="flex items-center space-x-10">
          <Link
            href="/explore"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </div>
        <button type="submit" className={cn(buttonVariants())}>
          <span>Share</span>
          <Icons.share className="ml-2 w-4" />
        </button>
      </div>
    </div>
  );
};

export default page;
