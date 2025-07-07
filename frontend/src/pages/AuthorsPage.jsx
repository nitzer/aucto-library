import { useParams } from "react-router";
import useAuthorQuery from "../hooks/useAuthorQuery";
import { Divider, Flex, Space, Spin } from "antd";
import BooksByAuthor from "../components/Books/BooksByAuthor";
import MainTitle from "../components/UI/MainTitle";
import AddBookForm from "../components/Books/AddBookForm";
import { useEffect } from "react";

const AuthorsPage = () => {
  const params = useParams();
  const { isPending, error, data } = useAuthorQuery(params.authorId);

  useEffect(() => {
    document.title = data
      ? `Library - ${data.firstName} ${data.lastName}`
      : `Library - Loading Author ...`;
  }, [data]);

  let content;

  if (isPending) {
    content = <Spin />;
  }

  if (error) {
    content = <p>An error occurred, please try again later.</p>;
  }

  if (data) {
    content = (
      <div>
        <Space>
          <MainTitle text={`${data.firstName} ${data.lastName}`} />
          <AddBookForm authorId={params.authorId} />
        </Space>
        <Divider />
        <BooksByAuthor authorId={params.authorId} />
      </div>
    );
  }

  return <div>{content}</div>;
};

export default AuthorsPage;
