import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { itemCategorySerialize } from "@/utils/serializers";
import { TransactionItem } from "@/services/stockTransactionService/dto";

interface Props extends TableProps<TransactionItem> {
  onView?: (item: TransactionItem) => void;
}

export const TransactionItemTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<TransactionItem>[] = [
    {
      title: "Nome",
      dataIndex: "itemName",
      render: (_, { stockItem }) => stockItem.item.name,
    },
    {
      title: "Local",
      dataIndex: "localName",
      render: (_, { stockItem }) => stockItem.local?.name,
    },
    {
      title: "Categoria",
      dataIndex: "category",
      render: (_, { stockItem }) =>
        itemCategorySerialize(stockItem.item.category),
    },
    {
      title: "Quantidade movimentada",
      dataIndex: "quantity",
      render: (_, { quantity }) => quantity,
    },
    {
      title: "Preço Aquisição",
      dataIndex: "acquisitionPrice",
      key: "acquisitionPrice",
      render: (_, { stockItem }) => formatCurrency(stockItem.acquisitionPrice),
    },
    {
      title: "Preço Venda",
      dataIndex: "price",
      key: "price",
      render: (_, { stockItem }) => formatCurrency(stockItem.price),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
