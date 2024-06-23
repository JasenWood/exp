"use client";
import {
  CheckCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import { Avatar, Button, Form, Modal, message } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

type FormValue = {
  jobInfo: {
    name: string;
    type: number;
  };
  syncTableInfo: {
    timeRange: [Dayjs, Dayjs];
    title: string;
  };
};
const formValue: FormValue = {
  jobInfo: {
    name: "normal job",
    type: 1,
  },
  syncTableInfo: {
    timeRange: [dayjs().subtract(1, "m"), dayjs()],
    title: "example table title",
  },
};
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formValue);
    }, time);
  });
};
const jobType = [
  {
    value: 1,
    label: "国企",
  },
  {
    value: 2,
    label: "私企",
  },
];

export default function Page() {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    console.log("values", values);
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="checkbox-group" label="任务类型">
          <CheckCard.Group style={{ width: "100%" }}>
            <CheckCard
              title="Spring Boot"
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                  size="large"
                />
              }
              description="导出支持的格式 csv, asc 等"
              value="task-exp-export"
            />
          </CheckCard.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>

      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          setVisible(false);
          message.success("提交成功");
        }}
        formProps={{
          validateMessages: {
            required: "此项为必填项",
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="分步表单"
              width={800}
              onCancel={() => setVisible(false)}
              open={visible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="创建实验"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            width="md"
            label="实验名称"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="日期" />
          <ProForm.Group title="时间选择">
            <ProFormDateTimePicker name="dateTime" label="开始时间" />
            <ProFormDatePicker name="date" label="结束时间" />
          </ProForm.Group>
          <ProFormTextArea
            name="remark"
            label="备注"
            width="lg"
            placeholder="请输入备注"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="设置参数">
          <ProFormCheckbox.Group
            name="checkbox"
            label="迁移类型"
            width="lg"
            options={["结构迁移", "全量迁移", "增量迁移", "全量校验"]}
          />
          <ProForm.Group>
            <ProFormText width="md" name="dbname" label="业务 DB 用户名" />
            <ProFormDatePicker
              name="datetime"
              label="记录保存时间"
              width="sm"
            />
            <ProFormCheckbox.Group
              name="checkbox"
              label="迁移类型"
              options={["完整 LOB", "不同步 LOB", "受限制 LOB"]}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="发布实验">
          <ProFormCheckbox.Group
            name="checkbox"
            label="部署单元"
            rules={[
              {
                required: true,
              },
            ]}
            options={["部署单元1", "部署单元2", "部署单元3"]}
          />
          <ProFormSelect
            label="部署分组策略"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            initialValue="1"
            options={[
              {
                value: "1",
                label: "策略一",
              },
              { value: "2", label: "策略二" },
            ]}
          />
          <ProFormSelect
            label="Pod 调度策略"
            name="remark2"
            width="md"
            initialValue="2"
            options={[
              {
                value: "1",
                label: "策略一",
              },
              { value: "2", label: "策略二" },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
}