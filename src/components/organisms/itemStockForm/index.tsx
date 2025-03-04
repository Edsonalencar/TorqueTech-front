import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { CreateLocalStockRequest } from "@/services/localStockService/dto";
import { itemCategoryOptions } from "@/utils/utils";
import { FormProps } from "antd";
import { Col, Form, Input, Row } from "antd";

interface Props extends FormProps<CreateLocalStockRequest> {}

export const ItemStockForm = ({ ...rest }: Props) => {
  return (
    <Form layout="vertical" {...rest}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label="Nome do Item"
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
            <Input placeholder="Digite o nome do item de estoque" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Categoria"
            name={"category"}
            key={"category"}
            id="category"
          >
            <SelectSearchInput
              placeholder="Selecione a categoria"
              options={itemCategoryOptions}
            />
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
