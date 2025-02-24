import { useEffect, useState } from "react";

import { Button, Flex, Form, Input, Modal, Space, Typography } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { UserForm } from "@/components/organisms/UserForm";
import { UserType } from "@/types";
import { cleanMask } from "@/utils/formaters/format";
import { CreateCustomerDTO, Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";
import { AddressForm } from "@/components/organisms/AddressForm";
import { Address } from "@/types/authTypes";

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

  const [profileForm] = Form.useForm<UserType>();
  const [addressForm] = Form.useForm<Address>();

  const create = async (data: CreateCustomerDTO) => {
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
    // const formValue = form.getFieldsValue();

    // if (initialData?.id) update(initialData.id, formValue);
    // else create(formValue);
    closeModal();
  };

  const closeModal = () => {
    profileForm.resetFields();
    addressForm.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      profileForm.setFieldsValue(initialData);
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
        <Typography.Title level={5}>Dados do Cliente</Typography.Title>
        <UserForm form={profileForm} />

        <Typography.Title level={5}>Endereço</Typography.Title>
        <AddressForm
          form={addressForm}
          address={initialData?.profile.address}
        />

        <Typography.Title level={5}>Veiculos</Typography.Title>
        <Form.List name="vehicles">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "first"]}
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Flex>
    </Modal>
  );
};
