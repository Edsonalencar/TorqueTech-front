import { Work, WorkStatus } from "@/services/workService/dto";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { Descriptions } from "antd";
import { WorkOrderDescription } from "../WorkOrderDescription";

interface Props {
  data: Work;
  title?: React.ReactNode | string;
}

export const WorkDescription: React.FC<Props> = ({ data, title }) => {
  return (
    <Descriptions
      title={title}
      layout="vertical"
      bordered
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Nome">{data.name}</Descriptions.Item>
      <Descriptions.Item label="Descrição">
        {data.description}
      </Descriptions.Item>
      <Descriptions.Item label="Custo Total">
        R$ {data.totalCost.toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item label="Preço">
        R$ {data.price.toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        {WorkStatus[data.status]}
      </Descriptions.Item>
      <Descriptions.Item label="Mecânico">
        {data.mechanic?.profile?.name}
      </Descriptions.Item>
      <Descriptions.Item label="Cliente">
        {data.customer?.profile?.name}
      </Descriptions.Item>
      <Descriptions.Item label="Veículo">
        {data.vehicle?.model} - {data.vehicle?.licensePlate}
      </Descriptions.Item>
      <Descriptions.Item label="Data de Criação">
        {formatDateAndTime(data.createdAt)}
      </Descriptions.Item>

      {data.orders && data.orders.length > 0 && (
        <Descriptions.Item label="Ordens de Trabalho">
          {data.orders.map((order) => (
            <WorkOrderDescription key={order.id} data={order} />
          ))}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};
