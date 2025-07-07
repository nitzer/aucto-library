import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "../api/api";

/**
 * Custom hook to retrieve the authors data.
 * @returns  isPending, error, data, isFetching
 */
const useAuthorsQuery = () => {
  const baseURL = "http://localhost:3000/authors";
  const url = new URL(baseURL);
  url.searchParams.append("page", 0);

  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => getAuthors(0),
  });
};

export default useAuthorsQuery;
