import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePosts = (postId?: string) => {
  const url = postId ? `/api/post/${postId}` : "/api/post";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
