import AddPost from "@/components/add-post";
import PostCard from "@/components/post-card";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

interface DashBoardProps {}

const DashBoard = async (props: DashBoardProps) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          user: {
            select: {
              name: true,
              image: true,
              email: true,
            },
          },
        },
      },
      author: {
        select: {
          name: true,
          image: true,
          email: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div>
      {posts?.length ? (
        <>
          <h3 className="text-2xl md:text-4xl font-bold">Your Posts</h3>
          <p className="text-slate-400 md:mt-2">Create and manage you posts</p>
          <div className="rounded-md mt-5 p-2">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </>
      ) : (
        <AddPost />
      )}
    </div>
  );
};

export default DashBoard;
