import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatEmail } from "@/lib/utils";

interface CommentCardProps {
  comment: {
    body: string;
    id: string;
    user: {
      name: string;
      image: string;
      email: string;
    };
  };
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="flex gap-4 p-4 border-b my-4">
      <Avatar className="w-12 h-12">
        <AvatarImage
          className="rounded-full overflow-hidden h-fit"
          src={comment.user.image || ""}
        />
        <AvatarFallback>{comment.user.name}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <p className="text-slate-800 font-medium">{comment.user.name}</p>
          <p className="text-slate-500 text-sm">
            {formatEmail(comment.user.email || "")}
          </p>
        </div>

        <p className="text-sm text-slate-600">{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
