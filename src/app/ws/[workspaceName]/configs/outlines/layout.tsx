"use client";
import {
  Button,
  Input,
  Layout,
  Space,
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

const MENU_ID = "blahblah";

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true,
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1677ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

const MemoTooltip = Tooltip || React.memo(Tooltip);
const { Header, Sider, Content } = Layout;
export default function TermLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { show } = useContextMenu({
    id: MENU_ID,
  });
  const [editable, setEditable] = useState([]);

  function handleContextMenu(event) {
    show({
      event,
      props: {
        key: "value",
      },
    });
  }

  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    console.log(inputRef);
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setEditable([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onRightClick = ({ event, node }) => {
    console.log(event, node);

    show({
      event,
      props: {
        key: node.key,
      },
    });
  };

  // I'm using a single event handler for all items
  // but you don't have too :)
  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "copy":
        console.log(event, props);
        setEditable([props.key]);
        break;
      case "cut":
        console.log(event, props);
        break;
      //etc...
    }
  };
  const router = useRouter();
  const handleClick = (
    selectedKeys,
    e: { selected: boolean; selectedNodes; node; event }
  ) => {
    if (selectedKeys.length > 0) {
      router.push(`/ws/default/configs/outlines/${selectedKeys[0]}`);
    }
  };

  return (
    <div>
      <Layout>
        <Sider style={{ background: "transparent" }}>
          <Tree
            onSelect={handleClick}
            treeData={treeData}
            onRightClick={onRightClick}
            titleRender={(item) => {
              if (editable && editable.includes(item.key)) {
                return (
                  <Space ref={inputRef}>
                    <input></input>
                    <Button>确定</Button>
                  </Space>
                );
              }
              return (
                <MemoTooltip title={item.title as any}>
                  {item.title as any}
                </MemoTooltip>
              );
            }}
          ></Tree>
          <Menu id={MENU_ID}>
            <Item id="copy" onClick={handleItemClick}>
              重命名
            </Item>
            <Item id="cut" onClick={handleItemClick}>
              Cut
            </Item>
            <Separator />
            <Item disabled>Disabled</Item>
            <Separator />
            <Submenu label="Foobar">
              <Item id="reload" onClick={handleItemClick}>
                Reload
              </Item>
              <Item id="something" onClick={handleItemClick}>
                Do something else
              </Item>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
}
