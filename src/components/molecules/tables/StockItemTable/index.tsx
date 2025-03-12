import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { StockItem } from "@/services/stockItemService/dto";
import { itemCategorySerialize } from "@/utils/serializers";

interface Props extends TableProps<StockItem> {
  onView?: (item: StockItem) => void;
}

export const StockItemTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<StockItem>[] = [
    {
      title: "Nome",
      dataIndex: "itemName",
      render: (_, { item }) => item.name,
    },
    {
      title: "Local",
      dataIndex: "localName",
      render: (_, { local }) => local?.name,
    },
    {
      title: "Categoria",
      dataIndex: "category",
      render: (_, { item }) => itemCategorySerialize(item.category),
    },
    {
      title: "Quantidade em Estoque",
      dataIndex: "quantity",
      render: (_, { quantity }) => quantity,
    },
    {
      title: "Preço Aquisição",
      dataIndex: "acquisitionPrice",
      key: "acquisitionPrice",
      render: (_, { acquisitionPrice }) => formatCurrency(acquisitionPrice),
    },
    {
      title: "Preço Venda",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
