import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import {
  StockTransaction,
  TransactionStatus,
} from "@/services/stockTransactionService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { transactionCategorySerialize } from "@/utils/serializers";
import { ActionsMenu } from "../../ActionsMenu";
import { User } from "@/types/authTypes";

interface Props extends TableProps<StockTransaction> {
  onView?: (transaction: StockTransaction) => void;
  onViewOwner?: (user: User) => void;
  onCancel?: (transaction: StockTransaction) => void;
  onEdit?: (transaction: StockTransaction) => void;
}

export const StockTransactionTable = ({
  onView,
  onViewOwner,
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
      title: "Responsavel",
      dataIndex: "owner",
      key: "owner",
      render: (_, { owner }) => (
        <Typography.Link
          className="w-full truncate flex items-center gap-2"
          title={owner.profile?.name}
          onClick={() => onViewOwner?.(owner)}
        >
          {owner.profile?.name}
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
      title: "Items",
      dataIndex: "item",
      key: "item",
      render: (_, { items }) => {
        const completeName = items
          .map((item) => `${item.stockItem.item.name} x ${item.quantity}uni`)
          .join(", ");

        return (
          <div className=" truncate max-w-40" title={completeName}>
            {completeName}
          </div>
        );
      },
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => formatCurrency(price),
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

  return (
    <Table
      columns={columns}
      rowClassName={(record) => {
        if (record.status === TransactionStatus.CANCELLED) {
          return " bg-red-50";
        }
        return "";
      }}
      {...rest}
    />
  );
};
