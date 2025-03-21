import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import {
  CreateLocalStockRequest,
  LocalStock,
} from "@/services/localStockService/dto";
import { LocalStockService } from "@/services/localStockService/service";
import { LocalStockForm } from "@/components/organisms/forms/localStockForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: LocalStock;
  reload?: () => Promise<void>;
}

type ResourceType = CreateLocalStockRequest;
const Service = LocalStockService;

export const CreateLocalModal = ({
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
      console.error("Create Vehicle", error);
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
      console.error("Update Vehicle", error);
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
        ...initialData,
      });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Local`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={400}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <LocalStockForm form={form} />
      </Flex>
    </Modal>
  );
};
