import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import {
  InputStockItemDTO,
  InputStockTransactionRequest,
  StockTransaction,
  TransactionCategoryIn,
} from "@/services/stockTransactionService/dto";
import { StockTransactionService } from "@/services/stockTransactionService/service";
import { InputStockTransactionForm } from "@/components/organisms/forms/InputStockTransactionForm";
import { LocalStock } from "@/services/localStockService/dto";
import { ItemStock } from "@/services/itemStockService/dto";
import dayjs from "dayjs";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: StockTransaction;
  reload?: () => Promise<void>;

  onAddItem?: () => void;
  onAddLocal?: () => void;
  itemsStock?: ItemStock[];
  localStock?: LocalStock[];
}

type ResourceType = InputStockTransactionRequest;
const Service = StockTransactionService;

export const InputStockTransactionModal = ({
  isOpen,
  onClose,
  initialData,
  reload,

  itemsStock,
  localStock,
  onAddItem,
  onAddLocal,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ResourceType>();

  const create = async (data: ResourceType) => {
    try {
      setLoading(true);
      await Service.createInput(data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create [InputStockTransactionModal]", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: ResourceType) => {
    try {
      setLoading(true);
      await Service.updateInput(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Update [InputStockTransactionModal]", error);
    } finally {
      setLoading(false);
    }
  };

  const getStockItem = (item: InputStockItemDTO) => {
    return initialData?.items.find(
      (transItem) =>
        transItem.stockItem.item.id == item.itemId &&
        transItem.stockItem.local?.id == item.localId &&
        transItem.stockItem.acquisitionPrice == item.acquisitionUnitPrice
    );
  };

  const submit = async () => {
    const formValue = await form.validateFields();

    const data: ResourceType = {
      ...formValue,
      items: formValue.items.map((item) => ({
        ...item,
        stockItemId: getStockItem(item)?.stockItem.id,
      })),
    };

    if (initialData?.id) update(initialData.id, data);
    else create(data);
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      form.setFieldsValue({
        category: initialData.category as TransactionCategoryIn,
        transactionAt: dayjs(initialData.transactionDate),
        items: initialData.items.map((item) => ({
          acquisitionUnitPrice: item.stockItem.acquisitionPrice,
          itemId: item.stockItem.item.id,
          localId: item?.stockItem?.local?.id,
          quantity: item.quantity,
          price: item.stockItem.price,
        })),
      });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Entrada de Estoque`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={1200}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <InputStockTransactionForm
          form={form}
          onAddItem={onAddItem}
          onAddLocal={onAddLocal}
          itemsStock={itemsStock}
          localStock={localStock}
        />
      </Flex>
    </Modal>
  );
};
