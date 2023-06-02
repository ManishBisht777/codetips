import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePosts = (postId: string) => {
  const url = `/api/post/${postId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
