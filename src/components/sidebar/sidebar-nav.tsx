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
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function SidebarNav({}) {
  const router = useRouter();
  const workspaceName = "default";
  const items = [
    {
      key: `/ws/${workspaceName}/dashboard`,
      icon: <UserOutlined />,
      label: "中心文件",
    },
    {
      key: `/ws/${workspaceName}/configs/`,
      icon: <VideoCameraOutlined />,
      label: "实验配置",
      children: [
        {
          key: `/ws/${workspaceName}/configs/terms`,
          icon: <VideoCameraOutlined />,
          label: "术语配置",
        },
        {
          key: `/ws/${workspaceName}/configs/outlines`,
          icon: <VideoCameraOutlined />,
          label: "大纲配置",
        },
        {
          key: `/ws/${workspaceName}/configs/models/redirect`,
          icon: <VideoCameraOutlined />,
          label: "表格配置",
        },
      ],
    },
    {
      key: `/ws/${workspaceName}/dags`,
      icon: <UploadOutlined />,
      label: "任务管理",
      children: [
        {
          key: `/ws/${workspaceName}/dags/create`,
          icon: <VideoCameraOutlined />,
          label: "创建任务",
        },
        {
          key: `/ws/${workspaceName}/dags`,
          icon: <VideoCameraOutlined />,
          label: "任务查看",
        },
      ],
    },
    
    {
      key: `/ws/${workspaceName}/libraries`,
      icon: <UploadOutlined />,
      label: "文件管理",
      type: "group",
      children: [
        {
          key: `/ws/${workspaceName}/libraries/1`,
          icon: <VideoCameraOutlined />,
          label: "名称1",
        },
        {
          key: `/ws/${workspaceName}/dags`,
          icon: <VideoCameraOutlined />,
          label: "民称2",
        },
      ],
    },
  ];
  const onClick = (e: any) => {
    router.push(e.key);
  };

  return (
    <>
      <div>
        <Sider trigger={null}>
          <div className="demo-logo-vertical" />
          <Menu
            onClick={onClick}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
      </div>
    </>
  );
}
