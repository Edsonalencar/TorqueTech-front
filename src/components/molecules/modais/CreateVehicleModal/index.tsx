import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { CreateVehicleDTO, Vehicle } from "@/services/vehicleService/dto";
import { VehicleService } from "@/services/vehicleService/service";
import { VehicleForm } from "@/components/organisms/VehicleForm";
import { CreateVehicleTypeModal } from "../CreateVehicleTypeModal";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Vehicle;
  reload?: () => Promise<void>;
}

export const CreateVehicleModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [newVehicleTypeOpen, setNewVehicleTypeOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<CreateVehicleDTO>();

  const create = async (data: CreateVehicleDTO) => {
    try {
      setLoading(true);
      await VehicleService.create(data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create Vehicle", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: CreateVehicleDTO) => {
    try {
      setLoading(true);
      await VehicleService.update(id, data);
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
      title={`${initialData ? "Editar" : "Adicionar"} Veículo`}
      open={isOpen && !newVehicleTypeOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={400}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <VehicleForm
          form={form}
          newVehicleTypeOpen={newVehicleTypeOpen}
          setNewVehicleTypeOpen={setNewVehicleTypeOpen}
        />
      </Flex>
    </Modal>
  );
};
