"use client";

import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { ConfigProvider, theme } from "antd";
import Image from "next/image";
import { Typography } from "antd";
import Title from "antd/es/typography/Title";

const { Text } = Typography;
const { Header, Content } = Layout;
const { darkAlgorithm, defaultAlgorithm } = theme;

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }: AppProps) => {
  const [layoutRendered, setLayoutRendered] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>("dark");

  useEffect(() => {
    setLayoutRendered(true);
  }, []);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "dark" ? "default" : "dark");
  };

  const logo = (
    <div className="logo flex justify-center items-center">
      {/* Add your logo component here */}
      <Image
        src="/MES_logo.jpg"
        alt="Logo"
        className="rounded-md"
        width={50}
        height={50}
      />
      <Title
        level={2}
        style={{ marginLeft: 10, marginBottom:0 }}
      >
        MES College Marampally
      </Title>
    </div>
  );

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<BulbOutlined />} onClick={toggleTheme}>
        Toggle Theme
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout className="h-screen">
        <Layout>
          <Header
            className="header"
            style={{
              background: "#fff", // Replace with actual color or variable
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "transparent",
            }}
          >
            {logo}
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button icon={<UserOutlined />} style={{ marginRight: 10 }}>
                Profile
              </Button>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
              background: "#f0f2f5", // Replace with actual color or variable
              overflow: "auto",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
              backgroundColor: "transparent",
            }}
            className="flex-grow"
            id="scrollableDiv"
          >
            {layoutRendered && children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;