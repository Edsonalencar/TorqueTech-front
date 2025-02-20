import { useEffect, useState } from "react";

import { Flex, Form, Modal } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { UserForm } from "@/components/organisms/UserForm";
import { UserType } from "@/types";
import { cleanMask } from "@/utils/formaters/format";
import { CreateCustomerDTO, Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Customer;
  reload?: () => Promise<void>;
}

export const CreateCustomerModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateCustomerDTO>();

  const create = async (data: UserType) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await CustomerService.create(formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("create Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: UserType) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await CustomerService.update(id, formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const formValue = form.getFieldsValue();

    if (initialData?.id) update(initialData.id, formValue);
    else create(formValue);
    closeModal();
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Cliente`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={1000}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        Aqui haverá um cadastro
      </Flex>
    </Modal>
  );
};
