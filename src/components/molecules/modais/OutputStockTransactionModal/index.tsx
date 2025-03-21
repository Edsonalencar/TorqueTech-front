import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import {
  OutputStockTransactionRequest,
  StockTransaction,
  TransactionCategoryOut,
} from "@/services/stockTransactionService/dto";
import { StockTransactionService } from "@/services/stockTransactionService/service";
import { OutputStockTransactionForm } from "@/components/organisms/forms/OutputStockTransactionForm";
import dayjs from "dayjs";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: StockTransaction;
  reload?: () => Promise<void>;
}

type ResourceType = OutputStockTransactionRequest;
const Service = StockTransactionService;

export const OutputStockTransactionModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ResourceType>();

  const create = async (data: ResourceType) => {
    try {
      setLoading(true);
      await Service.createOutput(data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create [OutputStockTransactionModal]", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: ResourceType) => {
    try {
      setLoading(true);
      await Service.updateOutput(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Update [OutputStockTransactionModal]", error);
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
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      form.setFieldsValue({
        category: initialData.category as TransactionCategoryOut,
        transactionAt: dayjs(initialData.transactionDate),
        items: initialData.items.map((item) => ({
          stockItemId: item.stockItem.id,
          quantity: item.quantity,
          price: item.stockItem.price,
        })),
      });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Saída de Estoque`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <OutputStockTransactionForm form={form} />
      </Flex>
    </Modal>
  );
};
