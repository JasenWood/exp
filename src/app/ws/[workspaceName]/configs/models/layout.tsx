"use client";
import {
  Button,
  Input,
  Layout,
  Space,
  Tabs,
  TabsProps,
  Tooltip,
  Tree,
  TreeDataNode,
} from "antd";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/ReactContexify.css";
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

export default function ModelLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const onChange = (key: string) => {
    router.push(`/ws/default/configs/models/${key}`);
  };

  return (
    <div>
      <Button>新建表格</Button>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

      {children}
    </div>
  );
}
