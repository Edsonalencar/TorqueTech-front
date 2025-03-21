import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { StockItem } from "@/services/stockItemService/dto";
import { StockItemService } from "@/services/stockItemService/service";
import { OutputStockTransactionRequest } from "@/services/stockTransactionService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { transactionCategoryOutOptions } from "@/utils/utils";
import { Button, Flex, FormProps, Typography } from "antd";
import { Col, Form, InputNumber, Row, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";

interface Props extends FormProps<OutputStockTransactionRequest> {}

export const OutputStockTransactionForm = ({ ...rest }: Props) => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  const [loading, setLoading] = useState(false);

  const getStockItemName = (stock: StockItem) => {
    const itemName = stock.item.name;
    const itemQuantity = stock.quantity;
    const acquisitionPrice = stock.acquisitionPrice;

    return `${itemName} ${formatCurrency(
      acquisitionPrice
    )} - ${itemQuantity} un`;
  };

  const fetchResource = async () => {
    setLoading(true);
    try {
      const { data } = await StockItemService.get();
      setStockItems(data);
    } catch (error) {
      console.error("fetchResource [OutputStockTransactionOutForm]", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResource();
  }, []);

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Form layout="vertical" {...rest}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={16}>
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
                        <Col span={21}>
                          <Form.Item
                            label="Produto"
                            name={[name, "stockItemId"]}
                            key={key + "_stockItemId"}
                            rules={[
                              {
                                required: true,
                                message: "Campo obrigatório!",
                              },
                            ]}
                          >
                            <SelectSearchInput
                              placeholder="Selecione o produto"
                              options={stockItems.map((stock) => ({
                                value: stock.id,
                                label: getStockItemName(stock),
                              }))}
                            />
                          </Form.Item>
                          <Row gutter={[16, 16]} key={key}>
                            <Col span={12}>
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
                                <InputNumber
                                  min={1}
                                  placeholder="Quantidade"
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label="Preço"
                                name={[name, "price"]}
                                key={key + "_price"}
                                rules={[
                                  {
                                    required: true,
                                    message: "Campo obrigatório!",
                                  },
                                ]}
                              >
                                <InputMoney placeholder="Preço" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={3}>
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
          <Col span={24} md={8}>
            <Form.Item
              label="Categoria da Transação"
              name={"category"}
              key={"category"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <SelectSearchInput
                placeholder="Selecione a categoria"
                options={transactionCategoryOutOptions}
              />
            </Form.Item>
            <Form.Item
              label="Data da Transação"
              name={"transactionAt"}
              key={"transactionAt"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <DatePicker
                showTime
                style={{ width: "100%" }}
                format={"DD/MM/YYYY HH:mm"}
                placeholder="Selecione a data"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
