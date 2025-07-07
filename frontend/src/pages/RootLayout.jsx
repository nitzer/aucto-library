import { Outlet } from "react-router";
import MainHeader from "../components/MainHeader";
import { Content, Footer } from "antd/es/layout/layout";
import { App, Layout, theme } from "antd";
import { Events } from "../components/Events";
import { useEffect, useState } from "react";
import { socket } from "./../socket";

const contentStyle = {
  padding: "0 48px",
};

const RootLayout = () => {
  const [bookEvents, setBookEvents] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function onBooksNewEvent(value) {
    setBookEvents((previous) => [...previous, value]);
  }

  useEffect(() => {
    // Subscribe to books/new pub on backend!
    socket.on("books/new", onBooksNewEvent);

    return () => {
      socket.off("books/new", onBooksNewEvent);
    };
  }, []);

  return (
    <App notification={{ placement: "bottomRight" }}>
      <Layout>
        <MainHeader />
        <Content style={contentStyle}>
          <div> &nbsp; </div>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>

      <Events events={bookEvents} />
    </App>
  );
};

export default RootLayout;
