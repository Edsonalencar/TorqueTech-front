import { useEffect } from "react";
import { Form, Modal } from "antd";
import { CreateWorkOrderForm } from "@/components/organisms/forms/CreateWorkOrderForm";
import { CreateWorkOrderRequestDTO } from "@/services/workService/dto";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateWorkOrderRequestDTO) => void;
  initialData?: CreateWorkOrderRequestDTO;
}

export const CreateWorkOrderModal = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: Props) => {
  const [form] = Form.useForm<CreateWorkOrderRequestDTO>();

  const submit = async () => {
    const data = await form.validateFields();
    onSubmit(data);
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
      title={`${initialData ? "Editar" : "Adicionar"} Ordem de Serviço`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={1000}
    >
      <CreateWorkOrderForm form={form} />
    </Modal>
  );
};
