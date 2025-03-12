import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Work, WorkStatus } from "@/services/workService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { formatDate } from "@/utils/formaters/formatDate";
import { formatLicensePlate } from "@/utils/formaters/format";
import { ActionsMenu } from "../../ActionsMenu";
import { workStatusSerialize } from "@/utils/serializers";
import { Customer } from "@/services/customerService/dto";

interface Props extends TableProps<Work> {
  onView?: (work: Work) => void;
  onViewCustomer?: (customer: Customer) => void;
  onUpdateStatus?: (work: Work) => void;
  onEdit?: (work: Work) => void;
  onConclude?: (work: Work) => void;
  onCancel?: (work: Work) => void;
}

export const WorkTable = ({
  onView,
  onCancel,
  onConclude,
  onEdit,
  onUpdateStatus,
  onViewCustomer,
  ...rest
}: Props) => {
  const handler = (item: Work, func?: Function) => {
    if (!func) return undefined;

    return () => func(item);
  };

  const columns: ColumnProps<Work>[] = [
    {
      title: "Ind.",
      dataIndex: "id",
      key: "id",
      render: (_, item) => (
        <Typography.Link onClick={() => onView?.(item)}>
          {item.id?.substring(0, 8)}
        </Typography.Link>
      ),
    },
    {
      title: "Cliente",
      dataIndex: "customer",
      key: "customer",
      render: (_, { customer }) => (
        <Typography.Link
          onClick={() => onViewCustomer?.(customer)}
          title={customer.profile.name}
        >
          {customer.profile.name}
        </Typography.Link>
      ),
    },
    {
      title: "Titulo",
      dataIndex: "name",
      key: "name",
      render: (_, { title }) => title,
    },
    {
      title: "Veículo",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (_, { vehicle }) =>
        `${vehicle?.vehicleType.model}: ${formatLicensePlate(
          vehicle.licensePlate
        )}`,
    },
    {
      title: "Inicio",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Entrega",
      dataIndex: "expectedAt",
      key: "expectedAt",
      render: (_, { expectedAt }) => formatDate(expectedAt),
    },
    {
      title: "Custo",
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
      render: (_, { status }) => workStatusSerialize(status),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onView={handler(item, onView)}
          onEdit={handler(item, onEdit)}
          onCancel={handler(item, onCancel)}
          onConclude={handler(item, onConclude)}
          actions={[
            {
              label: "Atua. Status",
              onClick: () => onUpdateStatus?.(item),
              show: !!onUpdateStatus,
            },
          ]}
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
