import { toast } from "@/components/ui/use-toast";
import usePosts from "./usePost";
import React from "react";
import useCurrentUser from "./useCurrentUser";
import useInfinitePosts from "./useInfinitePosts";

const useLike = ({ postId }: { postId: string }) => {
  const { data: currentUser } = useCurrentUser();

  const { data: fetchedPost, mutate: mutateFetchedPost } = usePosts(postId);
  const { mutate: mutateAllPosts } = useInfinitePosts();

  const hasLiked = React.useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser, fetchedPost]);

  const toggleLike = React.useCallback(async () => {
    if (!currentUser)
      return toast({
        description: "Login to like posts",
      });

    try {
      await fetch(`/api/post/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postId,
          isLiked: hasLiked,
        }),
      });
      mutateFetchedPost();
      mutateAllPosts();

      return toast({
        description: !hasLiked ? "Liked post" : "Like updated",
      });
    } catch (error) {
      return toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }, [currentUser, postId, hasLiked, mutateFetchedPost]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
