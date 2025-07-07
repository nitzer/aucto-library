import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBooksByAuthor } from "../../api/api";
import BookCard from "./BookCard";
import { Flex } from "antd";

const BooksByAuthor = ({ authorId }) => {
  const params = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["books", { authorId }],
    queryFn: ({ signal }) => getBooksByAuthor({ signal, authorId }),
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
      <Flex wrap gap="large">
        {data.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </Flex>
    );
  }

  return <div>{content}</div>;
};

export default BooksByAuthor;
