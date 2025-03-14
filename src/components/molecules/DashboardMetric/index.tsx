import { DashboardMetricsDTO } from "@/services/dashboardService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { Card, Col, Row } from "antd";

interface Props {
  data?: DashboardMetricsDTO;
}

export const DashboardMetric: React.FC<Props> = ({ data }) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24} md={12} lg={6}>
        <Card title="Total de vendas" bordered={false}>
          {formatCurrency(data?.revenueFromCompletedWorks)}
        </Card>
      </Col>
      <Col span={24} md={12} lg={6}>
        {" "}
        <Card title="Valor a receber" bordered={false}>
          {formatCurrency(data?.pendingRevenueFromOpenWorks)}
        </Card>
      </Col>
      <Col span={24} md={12} lg={6}>
        <Card title="Clientes" bordered={false}>
          {data?.totalCustomers}
        </Card>
      </Col>
      <Col span={24} md={12} lg={6}>
        <Card title="Mecanicos" bordered={false}>
          {data?.totalMechanics}
        </Card>
      </Col>
    </Row>
  );
};
