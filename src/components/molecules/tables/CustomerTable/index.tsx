import { formatCpfCnpj, formatPhone } from "@/utils/formaters/format";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsMenu } from "../../ActionsMenu";
import { UserStatusTag } from "@/components/atoms/UserStatusTag";
import { Customer } from "@/services/customerService/dto";

interface Props extends TableProps<Customer> {
  onEdit?: (customer: Customer) => void;
  onView?: (customer: Customer) => void;
  onDisable?: (customer: Customer) => void;
  onEnable?: (customer: Customer) => void;
}

export const CustomerTable = ({
  onEdit,
  onView,
  onDisable,
  onEnable,
  ...rest
}: Props) => {
  const columns: ColumnProps<Customer>[] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <Typography.Link
          className="w-full truncate flex items-center gap-2"
          title={item.profile?.name}
          onClick={() => onView?.(item)}
        >
          {item.profile?.name}
          <UserStatusTag status={item.status} />
        </Typography.Link>
      ),
    },
    {
      title: "Documento",
      dataIndex: "document",
      key: "document",
      render: (_, { profile }) =>
        profile?.document ? formatCpfCnpj(profile?.document) : "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, { email }) => email,
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      render: (_, { profile }) =>
        profile?.phone ? formatPhone(profile.phone) : "-",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onEdit={onEdit ? () => onEdit?.(item) : undefined}
          onView={onView ? () => onView?.(item) : undefined}
          onDisable={onDisable ? () => onDisable?.(item) : undefined}
          onEnable={onEnable ? () => onEnable?.(item) : undefined}
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
