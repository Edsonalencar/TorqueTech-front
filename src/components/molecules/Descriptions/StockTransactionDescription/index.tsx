import { Descriptions } from "antd";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { StockTransaction } from "@/services/stockTransactionService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import {
  transactionCategorySerialize,
  transactionStatusSerialize,
  transactionTypeSerialize,
} from "@/utils/serializers";

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
      column={{ xxl: 4, xl: 4, lg: 3, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Tipo">
        {transactionTypeSerialize(data.type)}
      </Descriptions.Item>
      <Descriptions.Item label="Categoria">
        {transactionCategorySerialize(data.category)}
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        {transactionStatusSerialize(data.status)}
      </Descriptions.Item>
      <Descriptions.Item label="Responsável">
        {data.owner.profile?.name}
      </Descriptions.Item>
      <Descriptions.Item label="Data da Transação">
        {formatDateAndTime(data.transactionDate)}
      </Descriptions.Item>
      <Descriptions.Item label="Quantidade Total">
        {data.quantity}
      </Descriptions.Item>
      <Descriptions.Item label="Valor Total">
        {formatCurrency(data.price)}
      </Descriptions.Item>
    </Descriptions>
  );
};
