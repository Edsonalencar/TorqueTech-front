import { Table, TableProps } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsMenu } from "../../ActionsMenu";
import { ActiveStatus } from "@/types/authTypes";
import { LocalStock } from "@/services/localStockService/dto";

type TableType = LocalStock;

interface Props extends TableProps<TableType> {
  onEdit?: (item: TableType) => void;
  onToggleStatus?: (item: TableType) => void;
}

export const LocalStockTable = ({ onEdit, onToggleStatus, ...rest }: Props) => {
  const handler = (item: TableType, func?: Function) => {
    if (!func) return undefined;

    return () => func(item);
  };

  const columns: ColumnProps<TableType>[] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onEdit={handler(item, onEdit)}
          onDisable={
            item.status == ActiveStatus.ACTIVE
              ? handler(item, onToggleStatus)
              : undefined
          }
          onEnable={
            item.status == ActiveStatus.INACTIVE
              ? handler(item, onToggleStatus)
              : undefined
          }
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
