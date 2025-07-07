import { Divider, Space, Spin } from "antd";
import useAuthorQuery from "../../hooks/useAuthorsQuery";
import AuthorCard from "./AuthorCard";
import AddAuthorForm from "./AddAuthorForm";
import MainTitle from "../UI/MainTitle";
const Authors = () => {
  const { isPending, error, data } = useAuthorQuery();

  let content;
  if (isPending) {
    content = <Spin />;
  }

  if (error) {
    content = <p>An error has occurred:{error}</p>;
  }

  if (data) {
    content = data.map((author) => {
      return <AuthorCard key={author._id} author={author} />;
    });
  } else {
    content = <p>No Authors exist, please create one!</p>;
  }

  return (
    <div>
      <Space>
        <MainTitle text="Latest Authors" />
      </Space>
      <Divider />
      {content}
      <Divider />
      <AddAuthorForm />
    </div>
  );
};

export default Authors;
