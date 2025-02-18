import { Descriptions } from "antd";
import { formatCpfCnpj } from "@/utils/formaters/format";
import { Garage } from "@/services/garageService/dto";
import { formatDateAndTime } from "@/utils/formaters/formatTime";

interface Props {
  data: Garage;
  title?: React.ReactNode | string;
}

export const GarageDescription: React.FC<Props> = ({ data, title }) => {
  return (
    <Descriptions
      title={title}
      layout="vertical"
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label="Nome">{data.name}</Descriptions.Item>
      <Descriptions.Item label="CNPJ">
        {formatCpfCnpj(data.cnpj)}
      </Descriptions.Item>
      <Descriptions.Item label="Criado Em">
        {formatDateAndTime(data.createdAt)}
      </Descriptions.Item>
    </Descriptions>
  );
};
