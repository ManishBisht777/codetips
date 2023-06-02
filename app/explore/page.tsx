import AddPost from "@/components/add-post";
import PostList from "@/components/post-list";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  return (
    <div className="flex gap-8 mt-16">
      <div className="w-full px-10 py-2 flex flex-col">
        <AddPost />
        <PostList />
      </div>
      <div className="fixed top-14 z-30 hidden h-[calc(100vh-10rem)] w-[260px] shrink-0 overflow-y-auto py-6 pr-2 md:sticky md:block lg:py-10">
        <ul>
          <li>post and update user schema update</li>
          <li>utility to convert email into like @manishbisht </li>
          <li>comment</li>
          <li>Infinite scroll</li>
          <li>performance optimise</li>
          <li>scroll optimise</li>
          <li>PWA</li>
          <li>Banner like valo?</li>
        </ul>
      </div>
    </div>
  );
};

export default page;
