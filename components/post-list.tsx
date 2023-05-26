"use client";

import React from "react";
import PostCard from "./post-card";
import { Icons } from "./icons";
import { PostWithUser } from "@/types";

type Props = {};

export default function PostList({}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<PostWithUser[]>([]);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await fetch("/api/post");
    const posts = await data.json();
    setPosts(posts);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col mt-5">
      {loading ? (
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
}
