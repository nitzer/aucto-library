import { Link, useParams } from "react-router";
import MainTitle from "../components/UI/MainTitle";
import { useQuery } from "@tanstack/react-query";
import { getBook } from "../api/api";
import { Alert, Col, Divider, Row, Space, Spin } from "antd";
import { useEffect } from "react";

const BookPage = () => {
  const params = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["books", { id: params.bookId }],
    queryFn: ({ signal }) => getBook({ signal, bookId: params.bookId }),
  });

  // Book Title!
  useEffect(() => {
    document.title = data
      ? `Library - ${data.title} by ${data.author.firstName} ${data.author.lastName}`
      : `Library - Loading Book ...`;
  }, [data]);

  let content;

  if (isLoading) {
    content = <Spin />;
  }

  if (isError) {
    content = (
      <Alert
        type="warning"
        message={`An error occurred: ${
          error.info?.message || "please try again later"
        }`}
      />
    );
  }

  if (data) {
    content = (
      <div>
        <Space>
          <MainTitle text={data.title} />
          <p>
            <Link to={`/authors/${data.author._id}`}>
              By {data.author.firstName} {data.author.lastName}
            </Link>
          </p>
        </Space>
        <Divider />
        <Row gutter={16}>
          <Col span={4}>
            <img
              src={`https://picsum.photos/200/400?random?random=${data._id}`}
              alt={data.title}
              className="h-[320px] w-[200px] object-cover"
            />
          </Col>
          <Col span={20}>
            <MainTitle text={data.title} />
            <p>{data.description}</p>
          </Col>
        </Row>
      </div>
    );
  }

  return content;
};

export default BookPage;
