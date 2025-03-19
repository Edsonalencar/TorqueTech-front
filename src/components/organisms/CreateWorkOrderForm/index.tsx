import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { StockItem } from "@/services/stockItemService/dto";
import { StockItemService } from "@/services/stockItemService/service";
import {
  CreateWorkOrderRequestDTO,
  WorkOrderStatus,
} from "@/services/workService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { workOrderStatusOptions } from "@/utils/utils";
import { Button, FormProps, Typography } from "antd";
import { Col, Form, Input, InputNumber, Row, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";

interface Props extends FormProps<CreateWorkOrderRequestDTO> {}

export const CreateWorkOrderForm = ({ form, ...rest }: Props) => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  const baseFom = form ? form : Form.useForm<CreateWorkOrderRequestDTO>()[0];

  const getStockItemName = (stock: StockItem) => {
    const itemName = stock.item.name;
    const itemQuantity = stock.quantity;
    const acquisitionPrice = stock.acquisitionPrice;

    return `${itemName} ${formatCurrency(
      acquisitionPrice
    )} - ${itemQuantity} un`;
  };

  const fetchResource = async () => {
    try {
      const { data } = await StockItemService.get();
      setStockItems(data);
    } catch (error) {
      console.error("fetchResource [OutputStockTransactionOutForm]", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchResource();
  }, []);

  const calcCost = () => {
    const formItems = baseFom.getFieldValue("stockItems");
    var itemCosts: number[] = [];

    formItems.forEach((item: any) => {
      const stockItem = stockItems.find(
        (stock) => stock.id === item.stockItemId
      );
      if (stockItem) {
        const cost = stockItem.acquisitionPrice * (item.quantity ?? 1);
        itemCosts.push(cost);
      }
    });

    const totalCost = itemCosts.reduce((acc, curr) => acc + curr, 0);
    baseFom.setFieldsValue({ cost: totalCost });
  };

  return (
    <Form layout="vertical" form={baseFom} {...rest}>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Typography.Title level={5}>Itens do Estoque</Typography.Title>
          <Form.List name="stockItems">
            {(fields, { add, remove }) => (
              <>
                <div
                  className="overflow-x-hidden overflow-y-auto"
                  style={{ maxHeight: "25rem" }}
                >
                  {fields.map(({ key, name }, index) => (
                    <Row
                      gutter={[16, 16]}
                      key={key}
                      className={`p-2 ${index % 2 === 0 ? "bg-gray-100" : ""}`}
                    >
                      <Col span={21}>
                        <Form.Item
                          label="Produto"
                          name={[name, "stockItemId"]}
                          rules={[
                            { required: true, message: "Campo obrigatório!" },
                          ]}
                        >
                          <SelectSearchInput
                            placeholder="Selecione o produto"
                            options={stockItems.map((stock) => ({
                              value: stock.id,
                              label: getStockItemName(stock),
                            }))}
                            onChange={calcCost}
                          />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <Form.Item
                              label="Quantidade"
                              name={[name, "quantity"]}
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
                                onChange={calcCost}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Preço"
                              name={[name, "price"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Campo obrigatório!",
                                },
                              ]}
                            >
                              <InputMoney
                                placeholder="Preço"
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={3} className="flex items-center">
                        <Button
                          block
                          size="small"
                          type="text"
                          onClick={() => {
                            remove(name);
                            calcCost();
                          }}
                        >
                          <FiMinusCircle />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </div>

                <Form.Item>
                  <Button type="primary" onClick={() => add()} block>
                    Adicionar Item do Estoque
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Título"
            name="title"
            rules={[{ required: true, message: "Campo obrigatório!" }]}
          >
            <Input placeholder="Título da ordem" />
          </Form.Item>
          <Form.Item label="Descrição" name="description">
            <Input.TextArea placeholder="Descrição da ordem" />
          </Form.Item>
          <Form.Item label="Nota" name="note">
            <Input.TextArea placeholder="Notas adicionais" />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Campo obrigatório!" }]}
                initialValue={WorkOrderStatus.PENDING}
              >
                <Select
                  placeholder="Selecione o status"
                  options={workOrderStatusOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Data de Início"
                name="startAt"
                initialValue={dayjs()}
              >
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  format={"DD/MM/YYYY HH:mm"}
                  placeholder="Data de início"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Data Prevista de Conclusão" name="expectedAt">
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  format={"DD/MM/YYYY HH:mm"}
                  placeholder="Data prevista"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Custo"
                name="cost"
                rules={[{ required: true, message: "Campo obrigatório!" }]}
              >
                <InputMoney placeholder="Custo da ordem" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
