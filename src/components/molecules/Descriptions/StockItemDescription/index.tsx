import { Descriptions } from "antd";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { StockItem } from "@/services/stockItemService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";

interface Props {
  data: StockItem;
  title?: React.ReactNode | string;
}

export const StockItemDescription: React.FC<Props> = ({ data, title }) => {
  return (
    <Descriptions
      title={title}
      layout="vertical"
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Nome">{data.item.name}</Descriptions.Item>
      {data.item.description && (
        <Descriptions.Item label="Descrição">
          {data.item.description}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Preço de Aquisição">
        {formatCurrency(data.acquisitionPrice)}
      </Descriptions.Item>
      <Descriptions.Item label="Preço de Venda">
        {formatCurrency(data.price)}
      </Descriptions.Item>
      <Descriptions.Item label="Quantidade">{data.quantity}</Descriptions.Item>
      {data.local && (
        <Descriptions.Item label="Local de Armazenamento">
          {data.local.name}
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Criado Em">
        {formatDateAndTime(data.createdAt)}
      </Descriptions.Item>
      {data.acquisitionAt && (
        <Descriptions.Item label="Data de Aquisição">
          {formatDateAndTime(data.acquisitionAt)}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};
