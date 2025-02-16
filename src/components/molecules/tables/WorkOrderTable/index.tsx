import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { WorkOrder, WorkOrderStatus } from "@/services/workService/dto";

interface Props extends TableProps<WorkOrder> {
  onView?: (order: WorkOrder) => void;
}

export const WorkOrderTable = ({ onView, ...rest }: Props) => {
  const columns: ColumnProps<WorkOrder>[] = [
    {
      title: "Titulo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: WorkOrderStatus) => WorkOrderStatus[status],
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Custo",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => formatCurrency(cost),
    },
    {
      title: "Data de Criação",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDateAndTime(date),
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
