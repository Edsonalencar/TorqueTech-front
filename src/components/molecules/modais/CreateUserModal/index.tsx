import { useEffect, useState } from "react";

import { Flex, Form, Modal, Typography } from "antd";

import { LoadingContent } from "@/components/atoms/LoadingContent";

import { cleanMask } from "@/utils/formaters/format";
import { AddressForm } from "@/components/organisms/AddressForm";
import { validateFormIsEmpty } from "@/utils/validations";
import { Address, User } from "@/types/authTypes";
import { UserForm } from "@/components/organisms/UserForm";
import { UserType } from "@/types";
import { CreateOrUpdateUserDTO } from "@/services/userService/dto";
import { UserService } from "@/services/userService/service";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: User;
  reload?: () => Promise<void>;
}

export const CreateUserModal = ({
  isOpen,
  onClose,
  initialData,
  reload,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileForm] = Form.useForm<UserType>();
  const [addressForm] = Form.useForm<{ address: Address }>();

  const create = async (data: CreateOrUpdateUserDTO) => {
    try {
      setLoading(true);
      const res = await UserService.create(data);
      if (!res) return;
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Create Garage", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: CreateOrUpdateUserDTO) => {
    try {
      setLoading(true);
      await UserService.update(id, data);
      if (reload) await reload();
      closeModal();
    } catch (error) {
      console.error("Update Garage", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const profileData = await profileForm.validateFields();
    const addressData = await addressForm.validateFields();

    const formValue: any = {
      ...profileData,
      document: cleanMask(profileData.document),
      address: validateFormIsEmpty(addressData.address)
        ? addressData.address
        : undefined,
    };

    if (initialData?.id) update(initialData.id, formValue);
    else create(formValue);
    closeModal();
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
        username: initialData?.auth?.username,
      });
      addressForm.setFieldsValue({ address: initialData?.profile?.address });
    }
  }, [initialData, isOpen]);

  return (
    <Modal
      title={`${initialData ? "Editar" : "Adicionar"} Usuário`}
      open={isOpen}
      onOk={submit}
      onClose={closeModal}
      onCancel={closeModal}
      okText="Salvar"
      width={800}
    >
      <LoadingContent isLoading={loading} />

      <Flex gap={15} vertical className="mt-5">
        <UserForm form={profileForm} requiredPassword={!initialData} />
        <Typography.Title level={5}>Endereço {`(Opcional)`}</Typography.Title>
        <AddressForm
          form={addressForm}
          address={initialData?.profile?.address}
        />
      </Flex>
    </Modal>
  );
};
