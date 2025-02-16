import { useEffect, useState } from "react";

import { Flex, Form, Modal } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { UserForm } from "@/components/organisms/UserForm";
import { UserType } from "@/types";
import { cleanMask } from "@/utils/formaters/format";
import { Mechanic } from "@/services/mechanicService/dto";
import { MechanicService } from "@/services/mechanicService/service";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Mechanic;
  reload?: () => Promise<void>;
}

export const CreateMechanicModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<UserType>();

  const create = async (data: UserType) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await MechanicService.create(formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create Mechanic", error);
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
      await MechanicService.update(id, formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Update Mechanic", error);
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
      const formValue = {
        ...initialData.user?.profile,
        email: initialData.user?.auth?.username,
      };

      form.setFieldsValue(formValue);
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Mecânico`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <UserForm form={form} withAuth />
      </Flex>
    </Modal>
  );
};
