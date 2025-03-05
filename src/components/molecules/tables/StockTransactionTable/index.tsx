import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import {
  StockTransaction,
  TransactionType,
} from "@/services/stockTransactionService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { transactionCategorySerialize } from "@/utils/serializers";
import { ActionsMenu } from "../../ActionsMenu";

interface Props extends TableProps<StockTransaction> {
  onView?: (transaction: StockTransaction) => void;
  onCancel?: (transaction: StockTransaction) => void;
  onEdit?: (transaction: StockTransaction) => void;
}

export const StockTransactionTable = ({
  onView,
  onCancel,
  onEdit,
  ...rest
}: Props) => {
  const handler = (item: StockTransaction, func?: Function) => {
    if (!func) return undefined;
    return () => func(item);
  };

  const columns: ColumnProps<StockTransaction>[] = [
    {
      title: "Ind.",
      dataIndex: "id",
      key: "id",
      render: (_, item) => (
        <Typography.Link onClick={() => onView?.(item)}>
          {item.id?.substring(0, 8)}
        </Typography.Link>
      ),
    },
    {
      title: "Data da Transação",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => formatDateAndTime(date),
    },
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
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onView={handler(item, onView)}
          onEdit={handler(item, onEdit)}
          onCancel={handler(item, onCancel)}
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
