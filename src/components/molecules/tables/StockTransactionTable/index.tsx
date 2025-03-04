import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import {
  StockTransaction,
  TransactionType,
} from "@/services/stockTransactionService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { transactionCategorySerialize } from "@/utils/serializers";

interface Props extends TableProps<StockTransaction> {
  onView?: (transaction: StockTransaction) => void;
}

export const StockTransactionTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<StockTransaction>[] = [
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
      render: (_, { category }) => transactionCategorySerialize(category),
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (_, { item }) => item?.item?.name,
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Preço Unitário",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, record) => formatCurrency(record.unitPrice * record.quantity),
    },
    {
      title: "Data da Transação",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => formatDateAndTime(date),
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
