import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { CreateItemStockModal } from "@/components/molecules/modais/CreateItemStockModal";
import { CreateLocalModal } from "@/components/molecules/modais/CreateLocalModal";
import { ItemStock } from "@/services/itemStockService/dto";
import { ItemStockService } from "@/services/itemStockService/service";
import { LocalStockService } from "@/services/localStockService/service";
import { InputStockTransactionRequest } from "@/services/stockTransactionService/dto";
import { transactionCategoryInOptions } from "@/utils/utils";
import { FormProps } from "antd";
import { Col, Form, InputNumber, Row, DatePicker } from "antd";
import { useEffect, useState } from "react";

interface Props extends FormProps<InputStockTransactionRequest> {}

export const InputStockTransactionForm = ({ ...rest }: Props) => {
  const [addLocalModalVisible, setAddLocalModalVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const [itemsStock, setItemsStock] = useState<ItemStock[]>([]);
  const [localStock, setLocalStock] = useState<ItemStock[]>([]);

  const [localLoading, setLocalLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);

  const fetchLocal = async () => {
    setLocalLoading(true);
    try {
      const { data } = await LocalStockService.get();
      setLocalStock(data);
    } catch (error) {
      console.error("fetchLocal [StockTransactionInForm]", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const fetchItems = async () => {
    setItemLoading(true);
    try {
      const { data } = await ItemStockService.get();
      setItemsStock(data);
    } catch (error) {
      console.error("fetchItems [StockTransactionInForm]", error);
    } finally {
      setItemLoading(false);
    }
  };

  useEffect(() => {
    fetchLocal();
    fetchItems();
  }, []);

  return (
    <>
      <LoadingContent isLoading={localLoading || itemLoading} />
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
                options={itemsStock.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
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
                options={localStock.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
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

      <CreateLocalModal
        isOpen={addLocalModalVisible}
        onClose={() => setAddLocalModalVisible(false)}
        reload={fetchLocal}
      />

      <CreateItemStockModal
        isOpen={addItemModalVisible}
        onClose={() => setAddItemModalVisible(false)}
        reload={fetchItems}
      />
    </>
  );
};
