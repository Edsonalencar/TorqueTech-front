import { CreateLocalStockRequest } from "@/services/localStockService/dto";
import { FormProps } from "antd";
import { Col, Form, Input, Row } from "antd";

interface Props extends FormProps<CreateLocalStockRequest> {}

export const LocalStockForm = ({ ...rest }: Props) => {
  return (
    <Form layout="vertical" {...rest}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label="Nome do Local"
            name={"name"}
            key={"name"}
            id="name"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <Input placeholder="Digite o nome do local de estoque" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Descrição"
            name={"description"}
            key={"description"}
            id="description"
          >
            <Input.TextArea
              placeholder="Digite uma descrição (opcional)"
              rows={4}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
