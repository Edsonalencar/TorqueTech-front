import { LoadingContent } from "@/components/atoms/LoadingContent";
import { AddressForm } from "@/components/organisms/AddressForm";
import { UserForm } from "@/components/organisms/UserForm";
import { Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";
import { UserType } from "@/types";
import { cleanMask } from "@/utils/formaters/format";
import { Button, Card, Col, Flex, Form, Row, Typography } from "antd";
import { Address } from "cluster";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToBack } from "@/components/atoms/ToBack";

interface Props {}

export const UpdateCustomerPage: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [resource, setResource] = useState<Customer>();

  const [profileForm] = Form.useForm<UserType>();
  const [addressForm] = Form.useForm<Address>();

  const navegate = useNavigate();
  const { uuid } = useParams();

  const toList = () => {
    navegate("/app/customers");
  };

  const fetchResource = async (resourceId: string) => {
    setLoading(true);
    try {
      const { data } = await CustomerService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [CreateCustomerPage]", error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: UserType) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };
    toList();
    try {
      setLoading(true);
      await CustomerService.update(id, formData);
    } catch (error) {
      console.error("update Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const profile = await profileForm.validateFields();
    const address = await addressForm.validateFields();

    console.log("profile", profile);
    console.log("address", address);

    // if (uuid) update(uuid, formValue);
  };

  useEffect(() => {
    if (!resource) return;
    profileForm.setFieldsValue({
      ...resource.profile,
      username: resource.email,
    });
  }, [resource]);

  useEffect(() => {
    if (uuid) fetchResource(uuid);
  }, [uuid]);

  return (
    <>
      <LoadingContent isLoading={loading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <Flex gap={15} vertical className="mt-5">
            <Typography.Title level={5}>Dados do Cliente</Typography.Title>
            <UserForm form={profileForm} />

            <Typography.Title level={5}>Endereço</Typography.Title>
            <AddressForm
              form={addressForm}
              address={resource?.profile.address}
            />

            <Row gutter={[16, 16]} justify="end">
              <Col span={24} md={6} lg={3}>
                <Button onClick={toList} className=" w-full">
                  Cancelar
                </Button>
              </Col>
              <Col span={24} md={6} lg={3}>
                <Button type="primary" onClick={submit} className=" w-full">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
