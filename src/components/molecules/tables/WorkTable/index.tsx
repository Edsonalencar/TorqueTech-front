import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Work, WorkStatus } from "@/services/workService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { formatDate } from "@/utils/formaters/formatDate";

interface Props extends TableProps<Work> {
  onView?: (work: Work) => void;
}

export const WorkTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<Work>[] = [
    {
      title: "Titulo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Veículo",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (_, { vehicle }) => `${vehicle?.brand} / ${vehicle?.model}`,
    },
    {
      title: "Iniciado em",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Custo Total",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (cost) => formatCurrency(cost),
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => WorkStatus[status],
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
