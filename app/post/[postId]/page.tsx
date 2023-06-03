//@ts-nocheck

"use client";

import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";
import { Icons } from "@/components/icons";
import ReadOnlyPost from "@/components/read-only-editor";
import { buttonVariants } from "@/components/ui/button";
import usePosts from "@/hooks/usePost";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PostPageProps {
  params: { postId: string };
}

const Page = ({ params }: PostPageProps) => {
  const { data: post } = usePosts(params.postId as string);

  if (!post) {
    notFound();
  }

  return (
    <div className="container md:px-0 px-4 flex flex-col items-center">
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

      <ReadOnlyPost
        post={{
          id: post.id,
          title: post.title,
          content: post.content,
          authorId: post.authorId,
          author: {
            image: post.author.image,
            name: post.author.name,
            email: post.author.image,
          },
        }}
      />

      <div className="mx-4 flex flex-col justify-start w-full max-w-2xl">
        <CommentForm postId={post.id || ""} />

        {post.comments.length > 0 && (
          <div className="flex flex-col">
            <h3 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1]">
              Recent Comments
            </h3>
            <div>
              {post.comments?.map((comment: any) => (
                <CommentCard
                  key={comment.id}
                  comment={{
                    body: comment.body,
                    id: comment.id,
                    user: {
                      name: comment.user.name || "",
                      image: comment.user.image || "",
                      email: comment.user.email || "",
                    },
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
