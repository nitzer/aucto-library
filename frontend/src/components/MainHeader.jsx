import { Header } from "antd/es/layout/layout";
import { Link } from "react-router";
const headerStyle = {
  backgroundColor: "#cacaca",
};

const MainHeader = () => {
  return (
    <Header style={headerStyle}>
      <h1 className="text-start">
        <Link to="/">
          Library
        </Link>
      </h1>
    </Header>
  );
};

export default MainHeader;
