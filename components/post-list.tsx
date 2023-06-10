"use client";

import React from "react";
import PostCard from "./post-card";
import { Icons } from "./icons";
import { PostWithUser } from "@/types";
import usePosts from "@/hooks/usePost";
import useInfinitePosts from "@/hooks/useInfinitePosts";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const PostList = ({}: Props) => {
  const {
    data: posts,
    size,
    setSize,
    isLoading,
    loadingMore,
    hasMore,
  } = useInfinitePosts();

  return (
    <div className="flex flex-col mt-5 pb-5">
      {isLoading ? (
        <div className="mt-5 flex justify-center">
          <Icons.spinner className="mr-2 h-4 w-10 animate-spin" />
        </div>
      ) : (
        posts && (
          <div>
            <InfiniteScroll
              className="pb-6"
              dataLength={posts.length}
              next={() => setSize(size + 1)}
              hasMore={!hasMore}
              loader={
                <div className="w-full- flex justify-center mt-4">
                  <Icons.spinner className="w-4 h-4 animate-spin" />
                </div>
              }
              endMessage={
                <div className="w-full- flex justify-center mt-4">
                  <p>Reached end of list</p>
                </div>
              }
            >
              {posts.length > 0 &&
                posts.map((post: PostWithUser) => {
                  return <PostCard key={post.id} {...post} />;
                })}
            </InfiniteScroll>
          </div>
        )
      )}
    </div>
  );
};

export default PostList;
