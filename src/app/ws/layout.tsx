"use client";
import React, { useContext, useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import ThemeProvider, {
  ThemeContext,
} from "@/components/provider/ThemeProvider";
import { useThemeStore } from "@/stores/theme";
import SidebarNav from "@/components/sidebar/sidebar-nav";

const { Header, Sider, Content } = Layout;

export default function WorkspaceLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <div>
        <Layout style={{ minHeight: "100vh", minWidth: "100vh" }}>
          <SidebarNav/>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
              <div onClick={toggleDarkMode}>xxx</div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
}
