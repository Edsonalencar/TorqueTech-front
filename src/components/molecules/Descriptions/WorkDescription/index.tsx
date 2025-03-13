import { Work } from "@/services/workService/dto";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { Descriptions, Typography } from "antd";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { workStatusSerialize } from "@/utils/serializers";
import { Customer } from "@/services/customerService/dto";
import { Mechanic } from "@/services/mechanicService/dto";

interface Props {
  data: Work;
  title?: React.ReactNode | string;
  onCustomerView?: (value: Customer) => void;
  onMechanicView?: (value: Mechanic) => void;
}

export const WorkDescription: React.FC<Props> = ({
  data,
  onCustomerView,
  onMechanicView,
  title,
}) => {
  return (
    <Descriptions
      title={title}
      layout="vertical"
      column={{ xxl: 4, xl: 4, lg: 3, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Titulo">{data.title}</Descriptions.Item>

      <Descriptions.Item label="Custo Total">
        {formatCurrency(data.totalCost)}
      </Descriptions.Item>
      <Descriptions.Item label="Preço">
        {formatCurrency(data.price)}
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        {workStatusSerialize(data.status)}
      </Descriptions.Item>
      <Descriptions.Item label="Mecânico">
        <Typography.Link
          onClick={() => onMechanicView?.(data.mechanic!!)}
          title={data.mechanic?.user.profile?.name}
        >
          {data.mechanic?.user.profile?.name}
        </Typography.Link>
      </Descriptions.Item>
      <Descriptions.Item label="Cliente">
        <Typography.Link
          onClick={() => onCustomerView?.(data.customer!!)}
          title={data.customer?.profile?.name}
        >
          {data.customer?.profile?.name}
        </Typography.Link>
      </Descriptions.Item>
      <Descriptions.Item label="Veículo">
        {data.vehicle?.vehicleType.model} - {data.vehicle?.licensePlate}
      </Descriptions.Item>
      <Descriptions.Item label="Data de Criação">
        {formatDateAndTime(data.createdAt)}
      </Descriptions.Item>

      {data?.description && (
        <Descriptions.Item label="Descrição" span={4}>
          {data.description}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};
