"use client";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Table, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import request from "umi-request";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};



export default function Page() {
  const router = useRouter()
  router.push("tab1")
  return <></>;
}
