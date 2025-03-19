import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { GiSergeant } from "react-icons/gi";

import { Outlet } from "react-router-dom";
import { MenuNavigate } from "../molecules/MenuNavigate";
import { AppHeader } from "../molecules/appHeader/Header";

export const LayoutTemplate: React.FC = () => {
  return (
    <Layout hasSider className="min-h-screen">
      <Sider
        trigger={null}
        theme="light"
        width={256}
        className="border-r border-gray-200 border-solid"
      >
        <div className=" pl-7 p-2.5 my-2">
          <span className="font-semibold text-lg flex items-center gap-2">
            <GiSergeant className="text-primary" />
            Torque Tech
          </span>
        </div>

        <MenuNavigate />
      </Sider>
      <Layout>
        <AppHeader />
        <section className="px-8 py-4">
          {/* Renderiza as paginas do react router dom */}
          <Outlet />
        </section>
      </Layout>
    </Layout>
  );
};
