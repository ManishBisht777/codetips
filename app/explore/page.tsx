import AddPost from "@/components/add-post";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex gap-8">
      <div className="w-full px-10 py-2 flex flex-col">
        <AddPost />
        <div>
          <ol>
            <li>post api routes</li>
            <li>zod and react hook form</li>
            <li>Post complete</li>
            <li>Fetch on frontend</li>
            <li>React virtualized</li>
          </ol>
        </div>
      </div>
      <div className="fixed top-14 z-30 hidden h-[calc(100vh-10rem)] w-[260px] shrink-0 overflow-y-auto py-6 pr-2 md:sticky md:block lg:py-10">
        Banner like valo?
      </div>
    </div>
  );
};

export default page;
