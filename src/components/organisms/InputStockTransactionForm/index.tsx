import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { ItemStock } from "@/services/itemStockService/dto";
import { LocalStock } from "@/services/localStockService/dto";
import { InputStockTransactionRequest } from "@/services/stockTransactionService/dto";
import { transactionCategoryInOptions } from "@/utils/utils";
import { FormProps } from "antd";
import { Col, Form, InputNumber, Row, DatePicker } from "antd";

interface Props extends FormProps<InputStockTransactionRequest> {
  onAddItem?: () => void;
  onAddLocal?: () => void;
  itemsStock?: ItemStock[];
  localStock?: LocalStock[];
}

export const InputStockTransactionForm = ({
  onAddItem,
  onAddLocal,
  itemsStock,
  localStock,
  ...rest
}: Props) => {
  return (
    <>
      <Form layout="vertical" {...rest}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Item"
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
              <SelectSearchInput
                placeholder="Selecione o item"
                options={itemsStock?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onAdd={onAddItem}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Local"
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
              <SelectSearchInput
                placeholder="Selecione o local"
                options={localStock?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onAdd={onAddLocal}
              />
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
              <InputMoney
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
              <InputMoney
                min={0}
                placeholder="Preço de Venda"
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
                format={"DD/MM/YYYY HH:mm"}
                style={{ width: "100%" }}
                placeholder="Selecione a data"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
