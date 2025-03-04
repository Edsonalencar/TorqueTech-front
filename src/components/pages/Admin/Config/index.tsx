import { Tabs, TabsProps } from "antd";
import { VehicleTypeConfig } from "./VehicleTypeConfig";

interface Props {}

export const AdminConfigPage: React.FC<Props> = ({}) => {
  const items: TabsProps["items"] = [
    {
      key: "3",
      label: "Tipos de Veículos",
      children: <VehicleTypeConfig />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} type="card" size="middle" />;
};
