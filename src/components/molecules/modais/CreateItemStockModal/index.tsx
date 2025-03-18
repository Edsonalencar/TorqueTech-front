import { useEffect, useState } from "react";
import { Flex, Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import {
  CreateItemStockRequest,
  ItemStock,
} from "@/services/itemStockService/dto";
import { ItemStockService } from "@/services/itemStockService/service";
import { ItemStockForm } from "@/components/organisms/itemStockForm";
import { CreateVehicleTypeModal } from "../CreateVehicleTypeModal";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import { VehicleTypeService } from "@/services/vehicleTypeService/service";

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
  const [newVehicleTypeOpen, setNewVehicleTypeOpen] = useState<boolean>(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ResourceType>();

  const fetchResource = async () => {
    setLoading(true);
    try {
      const { data } = await VehicleTypeService.get();
      setVehicleTypes(data);
    } catch (error) {
      console.error("fetchResource", error);
    } finally {
      setLoading(false);
    }
  };

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
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      form.setFieldsValue({
        ...initialData,
        vehicleTypeId: initialData.vehicleType.id,
      });
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    fetchResource();
  }, []);

  return (
    <>
      <Modal
        title={`${initialData ? "Editar" : "Adicionar"} Item`}
        open={isOpen && !newVehicleTypeOpen}
        onOk={submit}
        onClose={closeModal}
        onCancel={closeModal}
        okText="Salvar"
        width={400}
      >
        <LoadingContent isLoading={loading} />

        <Flex gap={15} vertical className="mt-5">
          <ItemStockForm
            form={form}
            vehicleTypes={vehicleTypes}
            onAddVhiclType={() => setNewVehicleTypeOpen(true)}
          />
        </Flex>
      </Modal>

      <CreateVehicleTypeModal
        isOpen={!!newVehicleTypeOpen}
        onClose={() => setNewVehicleTypeOpen(false)}
        reload={fetchResource}
      />
    </>
  );
};
