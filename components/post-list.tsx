"use client";

import React from "react";
import PostCard from "./post-card";
import { Icons } from "./icons";
import { PostWithUser } from "@/types";
import usePosts from "@/hooks/usePost";

type Props = {};

const PostList = ({}: Props) => {
  const { isLoading, data: posts } = usePosts();

  return (
    <div className="flex flex-col mt-5">
      {isLoading ? (
        <div className="mt-5 flex justify-center">
          <Icons.spinner className="mr-2 h-4 w-10 animate-spin" />
        </div>
      ) : (
        <div>
          {posts.length > 0 &&
            posts.map((post: PostWithUser) => {
              return <PostCard key={post.id} {...post} />;
            })}
        </div>
      )}
    </div>
  );
};

export default PostList;
