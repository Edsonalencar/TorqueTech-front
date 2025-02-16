import { StockTransaction, TransactionType } from "@/services/stockService/dto";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { Descriptions } from "antd";

interface Props {
  data: StockTransaction;
  title?: React.ReactNode | string;
}

export const StockTransactionDescription: React.FC<Props> = ({
  data,
  title,
}) => {
  return (
    <Descriptions
      title={title}
      layout="vertical"
      bordered
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Tipo de Transação">
        {TransactionType[data.transactionType]}
      </Descriptions.Item>
      <Descriptions.Item label="Item">
        {data.item?.item?.name}
      </Descriptions.Item>
      <Descriptions.Item label="Quantidade">{data.quantity}</Descriptions.Item>
      <Descriptions.Item label="Preço Unitário">
        R$ {data.unitPrice.toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item label="Total">
        R$ {(data.unitPrice * data.quantity).toFixed(2)}
      </Descriptions.Item>
      <Descriptions.Item label="Data da Transação">
        {formatDateAndTime(data.transactionDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Garagem">{data.garage?.name}</Descriptions.Item>
      <Descriptions.Item label="Responsável">
        {data.owner?.profile?.name}
      </Descriptions.Item>
    </Descriptions>
  );
};
