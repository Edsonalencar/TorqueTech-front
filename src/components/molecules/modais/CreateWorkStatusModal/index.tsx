import { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { Work, WorkStatusRequest } from "@/services/workService/dto";
import { WorkService } from "@/services/workService/service";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { workStatusOptions } from "@/utils/utils";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Work;
  reload?: () => Promise<void>;
}

export const CreateWorkStatusModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<WorkStatusRequest>();

  const update = async (id: string, data: WorkStatusRequest) => {
    try {
      setLoading(true);
      await WorkService.updateStatus(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handlerSubmit = async () => {
    const data = await form.validateFields();
    if (initialData) update(initialData.id, data);
  };

  const closeModal = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      form.setFieldsValue({
        status: initialData.status,
      });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`Atualizar Status de Serviço`}
      open={isOpen}
      onOk={handlerSubmit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={300}
    >
      <LoadingContent isLoading={loading} />
      <Form layout={`vertical`} form={form}>
        <Form.Item
          name={"status"}
          rules={[{ required: true, message: "Campo obrigatório!" }]}
        >
          <SelectSearchInput
            placeholder="Selecione o status"
            options={workStatusOptions}
            className="w-full"
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
