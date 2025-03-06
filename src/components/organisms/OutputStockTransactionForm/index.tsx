import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { StockItem } from "@/services/stockItemService/dto";
import { StockItemService } from "@/services/stockItemService/service";
import { OutputStockTransactionRequest } from "@/services/stockTransactionService/dto";
import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { transactionCategoryOutOptions } from "@/utils/utils";
import { Flex, FormProps } from "antd";
import { Col, Form, InputNumber, Row, DatePicker } from "antd";
import { useEffect, useState } from "react";

interface Props extends FormProps<OutputStockTransactionRequest> {}

export const OutputStockTransactionForm = ({ ...rest }: Props) => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  const [loading, setLoading] = useState(false);

  const getStockItemName = (stock: StockItem) => {
    return (
      <Flex vertical align="center" gap={8}>
        <Flex vertical>
          <p className="text-sm">{stock.item.name}</p>
          <p className="text-xs">{formatCurrency(stock.acquisitionPrice)}</p>
        </Flex>
        <p className="text-sm">{stock.quantity}</p>
      </Flex>
    );
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
        <Form.Item
          label="Produto"
          name={"stockItemId"}
          key={"stockItemId"}
          rules={[{ required: true, message: "Campo obrigatório!" }]}
        >
          <SelectSearchInput
            placeholder="Selecione o produto"
            options={stockItems.map((stock) => ({
              value: stock.id,
              label: getStockItemName(stock),
            }))}
          />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Preço"
              name={"price"}
              key={"price"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <InputMoney placeholder="Preço" />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Quantidade"
              name={"quantity"}
              key={"quantity"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
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
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <SelectSearchInput
                placeholder="Selecione a categoria"
                options={transactionCategoryOutOptions}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Data da Transação"
              name={"transactionAt"}
              key={"transactionAt"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
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
    </>
  );
};
