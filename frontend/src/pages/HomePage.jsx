import Authors from "../components/Authors/Authors";
import { Col, Row } from "antd";
import LatestBooks from "../components/Books/LatestBooks";
const HomePage = () => {
  return (
    <section>
      <Row gutter={16}>
        <Col span={4}>
          <Authors />
        </Col>
        <Col span={20}>
          <LatestBooks />
        </Col>
      </Row>
    </section>
  );
};

export default HomePage;
