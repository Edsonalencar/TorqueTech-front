import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatCpfCnpj } from "@/utils/formaters/format";
import { Garage } from "@/services/garageService/dto";
import { UserStatus } from "@/types/authTypes";

interface Props extends TableProps<Garage> {
  onView?: (garage: Garage) => void;
}

export const GarageTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<Garage>[] = [
    {
      title: "Ind.",
      dataIndex: "id",
      key: "id",
      className: "text-sm",
      render: (_, item) => (
        <Typography.Link onClick={() => onView?.(item)}>
          {item.id?.substring(0, 8)}
        </Typography.Link>
      ),
    },
    {
      title: "Responsável",
      dataIndex: "owner",
      key: "owner",
      render: (_, { owner }) => owner.profile?.name,
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
      render: (cnpj) => formatCpfCnpj(cnpj),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { owner }) => UserStatus[owner.status!!],
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
