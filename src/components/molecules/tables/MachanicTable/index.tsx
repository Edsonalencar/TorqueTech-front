import { formatCpfCnpj } from "@/utils/formaters/format";
import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { ActionsMenu } from "../../ActionsMenu";
import { UserStatus } from "@/types/authTypes";
import { UserStatusTag } from "@/components/atoms/UserStatusTag";
import { Mechanic } from "@/services/mechanicService/dto";

interface Props extends TableProps<Mechanic> {
  onEdit?: (mechanic: Mechanic) => void;
  onDelete?: (mechanic: Mechanic) => void;
  onView?: (mechanic: Mechanic) => void;
  onDisable?: (mechanic: Mechanic) => void;
  onEnable?: (mechanic: Mechanic) => void;
}

export const MechanicTable = ({
  onDelete,
  onEdit,
  onView,
  onDisable,
  onEnable,
  ...rest
}: Props) => {
  const columns: ColumnProps<Mechanic>[] = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (_, { user, id }) => (
        <Typography.Link
          className=" w-full truncate flex items-center gap-2"
          title={user?.profile?.name}
          onClick={() => onView?.({ id, user })}
        >
          {user?.profile?.name}
          <UserStatusTag status={user?.status} />
        </Typography.Link>
      ),
    },
    {
      title: "Documento",
      dataIndex: "email",
      key: "email",
      render: (_, { user }) =>
        user?.profile?.document ? formatCpfCnpj(user?.profile?.document) : "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, { user }) => user?.auth?.username,
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      render: (_, { user }) =>
        user?.profile?.phone ? user?.profile?.phone : "-",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onDelete={
            onDelete && item.user?.status == UserStatus.ACTIVE
              ? () => onDelete?.(item)
              : undefined
          }
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
