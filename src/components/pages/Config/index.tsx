import { Tabs, TabsProps } from "antd";
import { LocalStockConfig } from "./LocalStockConfig";
import { ItemStockConfig } from "./ItemStockConfig";

interface Props {}

export const ConfigPage: React.FC<Props> = ({}) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Items de estoque",
      children: <ItemStockConfig />,
    },
    {
      key: "2",
      label: "Locais de estoque",
      children: <LocalStockConfig />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};
