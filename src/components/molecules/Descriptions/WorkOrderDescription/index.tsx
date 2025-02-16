import { StockTransaction } from "@/services/stockService/dto";
import { WorkOrder, WorkOrderStatus } from "@/services/workService/dto";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { Descriptions } from "antd";

interface Props {
  data: WorkOrder;
  title?: React.ReactNode | string;
}

export const WorkOrderDescription: React.FC<Props> = ({ data, title }) => {
  return (
    <Descriptions
      title={title}
      layout="vertical"
      bordered
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Nome">{data.name}</Descriptions.Item>
      <Descriptions.Item label="Status">
        {WorkOrderStatus[data.status]}
      </Descriptions.Item>
      <Descriptions.Item label="Descrição">
        {data.description}
      </Descriptions.Item>
      <Descriptions.Item label="Custo">
        R$ {data.cost.toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item label="Data da Ordem">
        {formatDateAndTime(data.createdAt)}
      </Descriptions.Item>
      {data.items && data.items.length > 0 && (
        <Descriptions.Item label="Itens">
          {data.items.map((item: StockTransaction) => (
            <div key={item.id}>
              {item.item.item.name} - {item.quantity}x
            </div>
          ))}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};
