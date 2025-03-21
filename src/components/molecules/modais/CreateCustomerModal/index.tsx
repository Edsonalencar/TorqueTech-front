import { useEffect, useState } from "react";
import { Flex, Form, Modal, Typography } from "antd";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { UserForm } from "@/components/organisms/forms/UserForm";
import { UserType } from "@/types";
import { cleanMask } from "@/utils/formaters/format";
import { CreateCustomerDTO, Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";
import { AddressForm } from "@/components/organisms/forms/AddressForm";
import { Address } from "@/types/authTypes";
import { validateFormIsEmpty } from "@/utils/validations";

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
  const [addressForm] = Form.useForm<{ address: Address }>();

  const update = async (id: string, data: CreateCustomerDTO) => {
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
    const profileData = await profileForm.validateFields();
    const addressData = await addressForm.validateFields();

    const formValue: CreateCustomerDTO = {
      ...profileData,
      address: validateFormIsEmpty(addressData.address)
        ? addressData.address
        : undefined,
    };

    if (initialData?.id) update(initialData.id, formValue);
  };

  const closeModal = () => {
    profileForm.resetFields();
    addressForm.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData && isOpen) {
      profileForm.setFieldsValue({
        ...initialData.profile,
        username: initialData.email,
      });
      addressForm.setFieldsValue({ address: initialData.profile.address });
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
        <UserForm form={profileForm} />

        <Typography.Title level={5}>Endereço</Typography.Title>
        <AddressForm
          form={addressForm}
          address={initialData?.profile.address}
        />
      </Flex>
    </Modal>
  );
};
