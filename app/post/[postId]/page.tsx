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

// async function getPostById(postId: Post["id"], userId: User["id"]) {
//   const post = await prisma.post.findFirst({
//     where: {
//       id: postId,
//     },
//     include: {
//       comments: {
//         select: {
//           body: true,
//           id: true,
//           user: {
//             select: {
//               name: true,
//               image: true,
//               email: true,
//             },
//           },
//         },
//       },
//       author: {
//         select: {
//           name: true,
//           image: true,
//           email: true,
//         },
//       },
//     },
//   });

//   return {
//     post: { ...post, isCurrentUser: post?.authorId === userId },
//   };
// }

const page = ({ params }: PostPageProps) => {
  const { data: post } = usePosts(params.postId as string);

  if (!post) {
    notFound();
  }

  console.log(post);

  return (
    <div className="container flex flex-col items-center">
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

      {/* <ReadOnlyPost
        post={{
          id: post.id,
          title: post.title,
          content: post.content,
          published: post.published,
          createdAt: post.updatedAt,
          updatedAt: post.updatedAt,
          authorId: post.authorId,
          author: {
            image: post.author.image,
            name: post.author.name,
            email: post.author.image,
          },
          isCurrentUser: post.isCurrentUser,
        }}
      /> */}

      <div className="mx-4 bg-pink-100 flex flex-col justify-start w-full">
        <CommentForm postId={post.id || ""} />
        <div>
          {post.comments && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
