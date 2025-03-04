import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { InputStockTransactionRequest } from "@/services/stockTransactionService/dto";
import { transactionCategoryInOptions } from "@/utils/utils";
import { FormProps } from "antd";
import { Col, Form, Input, InputNumber, Row, DatePicker, Select } from "antd";

interface Props extends FormProps<InputStockTransactionRequest> {}

export const StockTransactionInForm = ({ ...rest }: Props) => {
  return (
    <Form layout="vertical" {...rest}>
      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="ID do Item"
            name={"itemId"}
            key={"itemId"}
            id="itemId"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <Input placeholder="UUID do item" />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="ID do Local"
            name={"localId"}
            key={"localId"}
            id="localId"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <Input placeholder="UUID do local" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 8 }}>
          <Form.Item
            label="Preço de Aquisição (Unitário)"
            name={"acquisitionUnitPrice"}
            key={"acquisitionUnitPrice"}
            id="acquisitionUnitPrice"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Preço de compra"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 8 }}>
          <Form.Item
            label="Preço de Venda Estimado"
            name={"price"}
            key={"price"}
            id="price"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Preço de venda"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 8 }}>
          <Form.Item
            label="Quantidade"
            name={"quantity"}
            key={"quantity"}
            id="quantity"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <InputNumber
              min={1}
              placeholder="Quantidade"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Categoria da Transação"
            name={"category"}
            key={"category"}
            id="category"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <SelectSearchInput
              placeholder="Selecione a categoria"
              options={transactionCategoryInOptions}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Data da Transação"
            name={"transactionAt"}
            key={"transactionAt"}
            id="transactionAt"
            rules={[
              {
                required: true,
                message: "Campo obrigatório!",
              },
            ]}
          >
            <DatePicker
              showTime
              style={{ width: "100%" }}
              placeholder="Selecione a data"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
