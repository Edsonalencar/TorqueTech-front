import { useEffect, useState } from "react";

import { Flex, Form, Modal, Typography } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { cleanMask } from "@/utils/formaters/format";
import { CreateGarageDTO, Garage } from "@/services/garageService/dto";
import { GarageService } from "@/services/garageService/service";
import { GarageForm } from "@/components/organisms/GarageForm";
import { AddressForm } from "@/components/organisms/AddressForm";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Garage;
  reload?: () => Promise<void>;
}

export const CreateGarageModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateGarageDTO>();

  const create = async (data: CreateGarageDTO) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await GarageService.create(formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create Garage", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: CreateGarageDTO) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await GarageService.update(id, formData);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Update Garage", error);
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
      const formValue: CreateGarageDTO = {
        ...initialData,
        ...initialData.owner?.profile,
        username: initialData.owner?.auth?.username!!,
      };

      form.setFieldsValue(formValue);
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Garagem`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <GarageForm form={form} withAuth />
        <Typography.Title level={5}>Endereço {`(Opcional)`}</Typography.Title>
        <AddressForm form={form} />
      </Flex>
    </Modal>
  );
};
