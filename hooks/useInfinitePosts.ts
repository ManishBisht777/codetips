import fetcher from "@/lib/fetcher";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return pageIndex ? `/api/post?page=${pageIndex}` : "/api/post";
};

const useInfinitePosts = () => {
  const {
    data: paginatedPosts,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite(getKey, fetcher);

  const data = paginatedPosts?.flat();

  const loadingMore =
    paginatedPosts && typeof paginatedPosts[size - 1] === "undefined";

  const hasMore =
    paginatedPosts && paginatedPosts[paginatedPosts.length - 1] < 4;

  return {
    data,
    size,
    isLoading,
    loadingMore,
    setSize,
    mutate,
    hasMore,
  };
};

export default useInfinitePosts;
