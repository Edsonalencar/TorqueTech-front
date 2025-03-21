import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { ItemStock } from "@/services/itemStockService/dto";
import { LocalStock } from "@/services/localStockService/dto";
import {
  InputStockTransactionRequest,
  TransactionCategoryIn,
} from "@/services/stockTransactionService/dto";
import { formatItemStock } from "@/utils/formaters";
import { transactionCategoryInOptions } from "@/utils/utils";
import { Button, Flex, FormProps, Typography } from "antd";
import { Col, Form, InputNumber, Row, DatePicker } from "antd";
import dayjs from "dayjs";
import { FiMinusCircle } from "react-icons/fi";

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
          <Col span={24} md={18}>
            <Typography.Title level={5}>Produtos</Typography.Title>

            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  <div className="max-h-96 overflow-y-auto overflow-x-hidden">
                    {fields.map(({ key, name }, index) => (
                      <Row
                        gutter={[16, 16]}
                        key={key}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : ""
                        } p-2`}
                      >
                        <Col span={22}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Form.Item
                                label="Item"
                                name={[name, "itemId"]}
                                key={key + "_itemId"}
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
                                    label: formatItemStock(item),
                                  }))}
                                  onAdd={onAddItem}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label="Local"
                                name={[name, "localId"]}
                                key={key + "_localId"}
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
                            <Col span={12}>
                              <Form.Item
                                label="Preço Aquisição (Uni)"
                                name={[name, "acquisitionUnitPrice"]}
                                key={key + "_acquisitionUnitPrice"}
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
                            <Col span={12}>
                              <Form.Item
                                label="Preço Venda (Uni)"
                                name={[name, "price"]}
                                key={key + "_price"}
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
                          </Row>

                          <Form.Item
                            label="Quantidade"
                            name={[name, "quantity"]}
                            key={key + "_quantity"}
                            rules={[
                              {
                                required: true,
                                message: "Campo obrigatório!",
                              },
                            ]}
                          >
                            <InputNumber min={0} style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <Flex
                            align="center"
                            justify="center"
                            className="h-full"
                          >
                            <Button
                              onClick={() => remove(name)}
                              block
                              size="small"
                              type="text"
                            >
                              <FiMinusCircle />
                            </Button>
                          </Flex>
                        </Col>
                      </Row>
                    ))}
                  </div>

                  <Form.Item>
                    <Button type="primary" onClick={() => add()} block>
                      Adicionar novo
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={24} md={6}>
            <Form.Item
              label="Categoria da Transação"
              name={"category"}
              key={"category"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
              initialValue={TransactionCategoryIn.PURCHASE}
            >
              <SelectSearchInput
                placeholder="Selecione a categoria"
                options={transactionCategoryInOptions}
              />
            </Form.Item>
            <Form.Item
              label="Data da Transação"
              name={"transactionAt"}
              key={"transactionAt"}
              id="transactionAt"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
              initialValue={dayjs()}
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
