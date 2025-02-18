import { Table, TableProps, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { formatCpfCnpj } from "@/utils/formaters/format";
import { Garage } from "@/services/garageService/dto";
import { UserStatusTag } from "@/components/atoms/UserStatusTag";
import { ActionsMenu } from "../../ActionsMenu";
import { UserStatus } from "@/types/authTypes";

interface Props extends TableProps<Garage> {
  onEdit?: (value: Garage) => void;
  onView?: (value: Garage) => void;
  onDisable?: (value: Garage) => void;
  onEnable?: (value: Garage) => void;
}

export const GarageTable = ({
  onView,
  onDisable,
  onEdit,
  onEnable,
  ...rest
}: Props) => {
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
      title: "Proprietário",
      dataIndex: "owner",
      key: "owner",
      render: (_, { owner }) => (
        <p
          className=" w-full truncate flex items-center gap-2"
          title={owner.profile?.name}
        >
          {owner.profile?.name}
          <UserStatusTag status={owner.status} />
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "owner",
      key: "owner",
      render: (_, { owner }) => owner.auth?.username,
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
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <ActionsMenu
          onEdit={onEdit ? () => onEdit?.(item) : undefined}
          onView={onView ? () => onView?.(item) : undefined}
          onDisable={
            onDisable && item.owner.status != UserStatus.INACTIVE
              ? () => onDisable?.(item)
              : undefined
          }
          onEnable={
            onEnable && item.owner.status != UserStatus.ACTIVE
              ? () => onEnable?.(item)
              : undefined
          }
        />
      ),
    },
  ];

  return <Table columns={columns} {...rest} />;
};
