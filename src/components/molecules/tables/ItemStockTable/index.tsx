import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { itemCategorySerialize } from "@/utils/serializers"; // Função para converter o enum em texto legível
import { ItemStock } from "@/services/itemStockService/dto";
import { ActionsMenu } from "../../ActionsMenu";
import { ActiveStatus } from "@/types/authTypes";

interface Props extends TableProps<ItemStock> {
  onEdit?: (item: ItemStock) => void;
  onToggleStatus?: (item: ItemStock) => void;
}

export const ItemStockTable = ({ onEdit, onToggleStatus, ...rest }: Props) => {
  const handler = (item: ItemStock, func?: Function) => {
    if (!func) return undefined;

    return () => func(item);
  };

  const columns: ColumnProps<ItemStock>[] = [
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
      title: "Categoria",
      dataIndex: "category",
      key: "category",
      render: (category) => itemCategorySerialize(category),
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
