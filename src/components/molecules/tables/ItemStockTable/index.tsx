import { Table, TableProps } from "antd";
import { ColumnProps } from "antd/es/table";
import { itemCategorySerialize } from "@/utils/serializers"; // Função para converter o enum em texto legível
import { ItemStock } from "@/services/itemStockService/dto";
import { ActionsMenu } from "../../ActionsMenu";
import { ActiveStatus } from "@/types/authTypes";
import { formatProductCode } from "@/utils/formaters/formatProductCode";
import { formatVehicleType } from "@/utils/formaters";

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
      title: "Código",
      dataIndex: "code",
      key: "code",
      render: (_, { code }) => formatProductCode(code),
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (_, { name, description }) => (
        <div>
          <p>{name}</p>
          <small>{description}</small>
        </div>
      ),
    },
    {
      title: "Veículo",
      dataIndex: "vehicleType",
      key: "vehicleType",

      render: (_, { vehicleType }) =>
        vehicleType ? formatVehicleType(vehicleType) : "-",
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
