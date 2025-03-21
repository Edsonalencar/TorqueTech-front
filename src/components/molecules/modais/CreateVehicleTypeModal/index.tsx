import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { VehicleTypeService } from "@/services/vehicleTypeService/service";
import { VehicleTypeForm } from "@/components/organisms/forms/VehicleTypeForm";
import {
  CreateVehicleTypeDTO,
  VehicleType,
} from "@/services/vehicleTypeService/dto";
import dayjs from "dayjs";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: VehicleType;
  reload?: () => Promise<void>;
}

export const CreateVehicleTypeModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateVehicleTypeDTO>();

  const create = async (data: CreateVehicleTypeDTO) => {
    try {
      setLoading(true);
      await VehicleTypeService.create(data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create Mechanic", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: CreateVehicleTypeDTO) => {
    try {
      setLoading(true);
      await VehicleTypeService.update(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Update Mechanic", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const data = await form.validateFields();
    if (initialData?.id) update(initialData.id, data);
    else create(data);
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
      title={`${initialData ? "Editar" : "Adicionar"} Tipos de Veículos`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={400}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <VehicleTypeForm form={form} />
      </Flex>
    </Modal>
  );
};
