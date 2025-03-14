import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import {
  CreateItemStockRequest,
  ItemStock,
} from "@/services/itemStockService/dto";
import { ItemStockService } from "@/services/itemStockService/service";
import { ItemStockForm } from "@/components/organisms/itemStockForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ItemStock;
  reload?: () => Promise<void>;
}

type ResourceType = CreateItemStockRequest;
const Service = ItemStockService;

export const CreateItemStockModal = ({
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
      await Service.create(data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("CreateItemStockModal [Create]", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: ResourceType) => {
    try {
      setLoading(true);
      await Service.update(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("CreateItemStockModal [Update]", error);
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
      });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Item`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={400}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <ItemStockForm form={form} />
      </Flex>
    </Modal>
  );
};
