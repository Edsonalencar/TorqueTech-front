import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { StockItem } from "@/services/stockService/dto";

interface Props extends TableProps<StockItem> {
  onView?: (item: StockItem) => void;
}

export const StockItemTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<StockItem>[] = [
    {
      title: "Nome",
      dataIndex: "item.name",
      key: "name",
    },
    {
      title: "Categoria",
      dataIndex: "item.category",
      key: "category",
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Preço Unitário",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <Typography.Link onClick={() => onView?.(item)}>
          Ver Detalhes
        </Typography.Link>
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
