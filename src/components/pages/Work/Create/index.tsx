import { ToBack } from "@/components/atoms/ToBack";
import { WorkOrderTable } from "@/components/molecules/tables/WorkOrderTable";
import { CreateWorkForm } from "@/components/organisms/CreateWorkForm";
import {
  CreateWorkOrderRequestDTO,
  CreateWorkRequestDTO,
} from "@/services/workService/dto";
import { Button, Card, Col, Flex, Form, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateWorkOrderModal } from "@/components/molecules/modais/CreateWorkOrderModal";
import { useNavigate } from "react-router-dom";
import { WorkService } from "@/services/workService/service";
import { LoadingContent } from "@/components/atoms/LoadingContent";

export const CreateWorkPage = () => {
  const [newOrderVisible, setNewOrderVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<CreateWorkRequestDTO>();
  const [workOrders, setWorkOrders] = useState<CreateWorkOrderRequestDTO[]>([]);

  const navigate = useNavigate();

  const toBack = () => {
    navigate(-1);
  };

  const [selectEditOrder, setSelectEditOrder] =
    useState<CreateWorkOrderRequestDTO>();

  const addWorkOrder = (data: CreateWorkOrderRequestDTO) => {
    setWorkOrders([...workOrders, data]);
  };

  const submit = async (formData: CreateWorkRequestDTO) => {
    setLoading(true);
    try {
      await WorkService.create(formData);
      toBack();
    } catch (error) {
      console.error("CreateWorkPage", error);
    } finally {
      setLoading(false);
    }
  };

  const handlerSubmit = async () => {
    const data = await form.validateFields();

    const formData = {
      ...data,
      workOrders,
    };

    await submit(formData);
  };

  return (
    <>
      <LoadingContent isLoading={loading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <CreateWorkForm form={form} />
        </Card>

        <Card>
          <Flex justify="space-between">
            <Typography.Title level={4} className="whitespace-nowrap">
              Entrada estoque
            </Typography.Title>
            <Flex gap={8}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setNewOrderVisible(true)}
              >
                Novo
              </Button>
            </Flex>
          </Flex>

          <WorkOrderTable dataSource={workOrders ?? []} />
        </Card>

        <Card>
          <Row gutter={[16, 16]} justify={"end"} style={{ width: "100%" }}>
            <Col span={12} md={6}>
              <Button type="default" style={{ width: "100%" }} onClick={toBack}>
                Cancelar
              </Button>
            </Col>
            <Col span={12} md={6}>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={handlerSubmit}
              >
                Salvar
              </Button>
            </Col>
          </Row>
        </Card>
      </Flex>

      <CreateWorkOrderModal
        isOpen={newOrderVisible || !!selectEditOrder}
        onClose={() => {
          setNewOrderVisible(false);
          setSelectEditOrder(undefined);
        }}
        onSubmit={addWorkOrder}
        initialData={selectEditOrder}
      />
    </>
  );
};
