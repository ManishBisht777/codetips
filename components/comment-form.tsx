"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { commentSchema } from "@/lib/validation/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { toast } from "./ui/use-toast";
import usePosts from "@/hooks/usePost";

interface commentFormProps {
  postId: string;
}

type FormData = z.infer<typeof commentSchema>;

const CommentForm = ({ postId }: commentFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePosts(postId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    console.log(postId, data);

    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: data.comment,
        postId: postId,
      }),
    });
    setIsLoading(false);
    mutateFetchedPost();

    if (response.ok) {
      return toast({
        description: "Comment Created",
      });
    } else
      return toast({
        description: "Some error occured",
        variant: "destructive",
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <p className="sr-only">Email</p>
        <Input
          id="email"
          placeholder="nice post"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          {...register("comment")}
        />
        {errors?.comment && (
          <p className="px-1 text-xs text-red-600">{errors.comment.message}</p>
        )}
      </div>
      <button className={cn(buttonVariants())} disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
