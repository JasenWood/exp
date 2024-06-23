"use client";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProTable,
  TableDropdown,
} from "@ant-design/pro-components";
import { Button, Dropdown, Form, Space, Table, Tag, message } from "antd";
import { useRef, useState } from "react";
import request from "umi-request";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  id: number;
  filename: string;
  options: string;
};

export default function Page() {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [visible, setVisible] = useState(false);

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "文件名",
      dataIndex: "filename",
      ellipsis: true,
      tooltip: "标题过长会自动收缩",
    },
    {
      title: "操作",
      key: "option",
      width: 120,
      valueType: "option",
      render: (_, row, index, action) => [
        <div key="a">
          <DrawerForm<{
            name: string;
            company: string;
          }>
            title="新建表单"
            resize={{
              onResize() {
                console.log("resize!");
              },
              maxWidth: window.innerWidth * 0.8,
              minWidth: 300,
            }}
            form={form}
            autoFocusFirstInput
            drawerProps={{
              destroyOnClose: true,
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              await waitTime(2000);
              console.log(values.name);
              message.success("提交成功");
              // 不返回不会关闭弹框
              return true;
            }}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建表单
              </Button>
            }
          >
            <ProForm.Group>
              <ProFormText
                name="name"
                width="md"
                label="签约客户名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                rules={[
                  {
                    required: true,
                  },
                ]}
                width="md"
                name="company"
                label="我方公司名称"
                placeholder="请输入名称"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="contract"
                label="合同名称"
                placeholder="请输入名称"
              />
              <ProFormDateRangePicker
                name="contractTime"
                label="合同生效时间"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: "chapter",
                    label: "盖章后生效",
                  },
                ]}
                width="xs"
                name="useMode"
                label="合同约定生效方式"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: "time",
                    label: "履行完终止",
                  },
                ]}
                formItemProps={{
                  style: {
                    margin: 0,
                  },
                }}
                name="unusedMode"
                label="合同约定失效效方式"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="主合同编号" />
            <ProFormText
              name="project"
              disabled
              label="项目名称"
              initialValue="xxxx项目"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="商务经理"
              initialValue="启途"
            />
          </DrawerForm>
        </div>,
      ],
    },
  ];
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        rowSelection={
          {
            // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
            // 注释该行则默认不显示下拉选项
            // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            // defaultSelectedRowKeys: [1],
          }
        }
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          return {
            data: [{ id: 1, filename: "xxx" }],
            success: true,
            total: 1,
          };
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />


    </>
  );
}
