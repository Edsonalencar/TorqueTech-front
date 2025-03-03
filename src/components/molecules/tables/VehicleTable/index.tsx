import { Vehicle } from "@/services/vehicleService/dto";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import dayjs from "dayjs";

interface Props extends TableProps<Vehicle> {
  onEdit?: (vehicle: Vehicle) => void;
}

export const VehicleTable = ({ onEdit, ...rest }: Props) => {
  const columns: ColumnProps<Vehicle>[] = [
    {
      title: "Placa",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Modelo",
      dataIndex: "vehicleType_model",
      key: "vehicleType_model",
      render: (_, { vehicleType }) => vehicleType.model,
    },
    {
      title: "Marca",
      dataIndex: "vehicleType_brand",
      key: "vehicleType_brand",
      render: (_, { vehicleType }) => vehicleType.brand,
    },
    {
      title: "Ano",
      dataIndex: "vehicleType_year",
      key: "vehicleType_year",
      render: (_, { vehicleType }) => vehicleType.year,
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
