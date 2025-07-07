import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBooksByAuthor } from "../../api/api";
import BookCard from "./BookCard";
import { Divider, Flex, Pagination } from "antd";
import { useState } from "react";

const BooksByAuthor = ({ authorId }) => {
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["books", authorId, page],
    queryFn: ({ signal }) => getBooksByAuthor({ signal, authorId, page }),
  });

  const handlePagination = (page) => {
    setPage(page);
  };

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
    console.log(data);
    content = (
      <>
        <Flex wrap gap="large">
          {data.books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </Flex>
        <Divider />
        <div className="flex justify-center">
          <Pagination
            current={page}
            total={data.total}
            onChange={handlePagination}
          />
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default BooksByAuthor;
