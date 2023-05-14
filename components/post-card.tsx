import React from "react";

interface PostCardProps {}

export default function PostCard({ ...props }: PostCardProps) {
  return (
    <div className="flex gap-4 border-b p-4">
      <div className="w-12 h-12 bg-black rounded-full"></div>
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <p className="text-slate-800 font-medium">Manish Bisht</p>
          <p className="text-slate-500 text-sm">@manishbisht9711</p>
        </div>
        <h3 className="text-slate-900 font-bold text-xl">
          Fetch data better way
        </h3>
        <p className="text-sm text-slate-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
          doloribus consectetur qui odio consectetur adipisicing elit ...
        </p>
      </div>
    </div>
  );
}
