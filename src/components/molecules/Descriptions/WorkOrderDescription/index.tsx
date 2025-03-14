import { WorkOrder } from "@/services/workService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { workOrderStatusSerialize } from "@/utils/serializers";
import { Descriptions, Typography } from "antd";

interface Props {
  data: WorkOrder;
  title?: React.ReactNode | string;
}

export const WorkOrderDescription: React.FC<Props> = ({ data, title }) => {
  const handlerViewWork = (id: string) => {
    console.log("View work", id);
  };

  return (
    <Descriptions
      title={title}
      layout="vertical"
      column={{ xxl: 4, xl: 4, lg: 3, md: 1, sm: 1, xs: 1 }}
    >
      {data?.work && (
        <Descriptions.Item label="Serviço">
          <Typography.Link onClick={() => handlerViewWork(data.work.id)}>
            {data.work.id?.substring(0, 8)}
          </Typography.Link>
        </Descriptions.Item>
      )}

      <Descriptions.Item label="Nome">{data.title}</Descriptions.Item>
      <Descriptions.Item label="Status">
        {workOrderStatusSerialize(data.status)}
      </Descriptions.Item>

      <Descriptions.Item label="Custo">
        {formatCurrency(data.cost)}
      </Descriptions.Item>
      <Descriptions.Item label="Data da Ordem">
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
