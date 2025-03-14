import { Button, Flex, Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuNavigate } from "../molecules/MenuNavigate";
import { NotificationsHeader } from "../atoms/NotificationsHeader";

export const LayoutTemplate: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  return (
    <Layout hasSider className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorPrimary }}
      >
        <div className="flex items-center w-full truncate justify-center p-3 mt-2 mb-1">
          <span className="font-extrabold text-xl text-[#FFF]">
            {collapsed ? "TCH" : "Torque Tech"}
          </span>
        </div>
        <MenuNavigate />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify="space-between" align="center" className=" pr-10">
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

            <NotificationsHeader />
          </Flex>
        </Header>
        <section className="p-4">
          {/* Renderiza as paginas do react router dom */}
          <Outlet />
        </section>
      </Layout>
    </Layout>
  );
};
