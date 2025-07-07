import { useQuery, useMutation } from "@tanstack/react-query";

/**
 * Custom hook to retrieve a single author data.
 * @returns  isPending, error, data, isFetching
 */
function useAuthorQuery(id) {
  return useQuery({
    queryKey: ["author", { id }],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/authors/${id}`);
      return await response.json();
    },
  });
}

export default useAuthorQuery;
