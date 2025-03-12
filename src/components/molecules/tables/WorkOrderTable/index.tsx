import { Table, TableProps } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { ActionsMenu } from "../../ActionsMenu";
import { CreateWorkOrderRequestDTO } from "@/services/workService/dto";

interface Props extends TableProps<CreateWorkOrderRequestDTO> {
  onView?: (workOrder: CreateWorkOrderRequestDTO) => void;
  onEdit?: (workOrder: CreateWorkOrderRequestDTO) => void;
  onDelete?: (workOrder: CreateWorkOrderRequestDTO) => void;
}

export const WorkOrderTable = ({
  onView,
  onEdit,
  onDelete,
  ...rest
}: Props) => {
  const handler = (item: CreateWorkOrderRequestDTO, func?: Function) => {
    if (!func) return undefined;
    return () => func(item);
  };

  const columns: ColumnProps<CreateWorkOrderRequestDTO>[] = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Data de Início",
      dataIndex: "startAt",
      key: "startAt",
      render: (date) => (date ? formatDateAndTime(date) : "-"),
    },
    {
      title: "Data Prevista",
      dataIndex: "expectedAt",
      key: "expectedAt",
      render: (date) => (date ? formatDateAndTime(date) : "-"),
    },
    {
      title: "Custo",
      dataIndex: "cost",
      key: "cost",
      render: (_, { cost }) => formatCurrency(cost),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onView={handler(item, onView)}
          onEdit={handler(item, onEdit)}
          onDelete={handler(item, onDelete)}
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
