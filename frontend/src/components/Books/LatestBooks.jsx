import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLatestBooks, queryClient } from "../../api/api";
import BookCard from "./BookCard";
import { Flex, Divider, Pagination } from "antd";
import MainTitle from "../UI/MainTitle";
import { useState } from "react";

const LatestBooks = () => {
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["books", page],
    queryFn: ({ signal }) => getLatestBooks({ signal, page }),
    placeholderData: keepPreviousData,
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
        <Flex wrap gap="small">
          {data.books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </Flex>
        <Divider />
        <div className="flex justify-center">
          <Pagination
            defaultCurrent={data.page}
            total={data.total}
            onChange={handlePagination}
          />
        </div>
      </>
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
