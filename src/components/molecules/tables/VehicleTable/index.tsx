import { Vehicle } from "@/services/vehicleService/dto";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";

interface Props extends TableProps<Vehicle> {
  onView?: (vehicle: Vehicle) => void;
}

export const VehicleTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<Vehicle>[] = [
    {
      title: "Placa",
      dataIndex: "licensePlate",
      key: "licensePlate",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Ano",
      dataIndex: "year",
      key: "year",
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
