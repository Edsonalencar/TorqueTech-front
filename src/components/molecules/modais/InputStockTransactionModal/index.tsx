import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import {
  InputStockTransactionRequest,
  StockTransaction,
  TransactionCategoryIn,
} from "@/services/stockTransactionService/dto";
import { StockTransactionService } from "@/services/stockTransactionService/service";
import { InputStockTransactionForm } from "@/components/organisms/InputStockTransactionForm";
import { LocalStock } from "@/services/localStockService/dto";
import { ItemStock } from "@/services/itemStockService/dto";

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

  const submit = async () => {
    const formValue = await form.validateFields();

    const data: ResourceType = {
      ...formValue,
    };

    if (initialData?.id) update(initialData.id, data);
    else create(data);
    closeModal();
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      form.setFieldsValue({
        ...initialData,
        itemId: initialData.item.id,
        localId: initialData?.item?.local?.id,
        category: initialData.category as TransactionCategoryIn,
      });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Transação de Estoque`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
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
