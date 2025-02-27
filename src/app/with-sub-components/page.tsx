// Since the current page uses sub-components,
// the use of sub-components in non-client components
// is not currently supported in the app router mode of next.js.
// So we need to add "use client";
// Markers. If the component you use in your page does not contain sub-components such as Select.Option,
// you do not need to add this tag to the page.
// More about without sub-components example see: src/app/page.tsx
"use client";

import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Rate,
  Typography,
  Space,
  Divider,
} from "antd";
import ThemeProvider from "../../components/provider/ThemeProvider";

const { Option } = Select;
const { Title } = Typography;

const Home = function Home() {
  return (
    <>
      <section style={{ textAlign: "center", marginTop: 48, marginBottom: 40 }}>
        <Space align="start">
          <img
            style={{ width: 40, height: 40 }}
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="Ant Design"
          />
          <Title level={2} style={{ marginBottom: 0 }}>
            Ant Design (With Sub Components)
          </Title>
        </Space>
      </section>
      <Divider style={{ marginBottom: 60 }}>Form</Divider>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Form.Item label="数字输入框">
          <InputNumber min={1} max={10} defaultValue={3} />
          <span className="ant-form-text"> 台机器</span>
          <a href="https://ant.design">链接文字</a>
        </Form.Item>
        <Form.Item label="开关">
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item label="滑动输入条">
          <Slider defaultValue={70} />
        </Form.Item>
        <Form.Item label="选择器">
          <Select defaultValue="lucy" style={{ width: 192 }}>
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>
              disabled
            </Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
        <Form.Item label="日期选择框">
          <DatePicker />
        </Form.Item>
        <Form.Item label="日期范围选择框">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item label="评分">
          <Rate defaultValue={5} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>Cancel</Button>
            <Button ghost href="/">
              Without Sub Components
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <ThemeProvider>
        <Home></Home>
      </ThemeProvider>
    </>
  );
};

export default HomePage;
