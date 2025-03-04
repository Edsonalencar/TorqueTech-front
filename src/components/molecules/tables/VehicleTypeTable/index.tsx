import { UserStatusTag } from "@/components/atoms/UserStatusTag";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import { User } from "@/types/authTypes";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";

type TableType = VehicleType;

interface Props extends TableProps<TableType> {
  onEdit?: (vehicle: TableType) => void;
  onView?: (user: User) => void;
}

export const VehicleTypeTable = ({ onEdit, onView, ...rest }: Props) => {
  const columns: ColumnProps<TableType>[] = [
    {
      title: "Responsável",
      dataIndex: "owner",
      key: "owner",
      render: (_, { owner }) => (
        <Typography.Link
          className="w-full truncate flex items-center gap-2"
          title={owner.profile?.name}
          onClick={() => onView?.(owner)}
        >
          {owner.profile?.name}
          <UserStatusTag status={owner.status} />
        </Typography.Link>
      ),
    },
    {
      title: "Modelo",
      dataIndex: "vehicleType_model",
      key: "vehicleType_model",
      render: (_, { model }) => model,
    },
    {
      title: "Marca",
      dataIndex: "vehicleType_brand",
      key: "vehicleType_brand",
      render: (_, { brand }) => brand,
    },
    {
      title: "Ano",
      dataIndex: "vehicleType_year",
      key: "vehicleType_year",
      render: (_, { year }) => year,
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <Typography.Link onClick={() => onEdit?.(item)}>Editar</Typography.Link>
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
