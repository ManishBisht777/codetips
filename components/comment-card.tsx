import React from "react";

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
  return <div>{comment.body}</div>;
};

export default CommentCard;
