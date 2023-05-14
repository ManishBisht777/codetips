"use client";

import React from "react";
import PostCard from "./post-card";
import { Post } from "@prisma/client";

type Props = {};

export default function PostList({}: Props) {
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post?count=${allPosts.length}`);
      const data = await res.json();
      setAllPosts([...allPosts, ...data]);
    } catch (error) {
      console.log(error);
      throw new Error("Error while fetching repositories from the GitHub API!");
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
