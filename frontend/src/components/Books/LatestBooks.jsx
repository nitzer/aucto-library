import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getLatestBooks } from "../../api/api";
import BookCard from "./BookCard";
import { Flex, Divider } from "antd";
import MainTitle from "../UI/MainTitle";

const LatestBooks = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["books"],
    queryFn: ({ signal }) => getLatestBooks({ signal }),
  });

  let content;

  if (isLoading) {
    content = <p>Loading books...</p>;
  }

  if (isError) {
    content = <p>An error occurred: {error.info?.message}</p>;
  }

  if (!data) {
    content = <p>No books, please add one.</p>;
  } else if (data) {
    content = (
      <Flex wrap gap="small">
        {data.map((book) => (
            <BookCard key={book._id} book={book} />
        ))}
      </Flex>
    );
  }

  return (
    <div>
      <MainTitle text="Latest Books" />
      <Divider />
      {content}
    </div>
  );
};

export default LatestBooks;
