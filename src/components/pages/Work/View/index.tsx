import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { WorkDescription } from "@/components/molecules/Descriptions/WorkDescription";
import { WorkOrderDescription } from "@/components/molecules/Descriptions/WorkOrderDescription";
import { CreateWorkOrderModal } from "@/components/molecules/modais/CreateWorkOrderModal";
import { TransactionItemTable } from "@/components/molecules/tables/TransactionItemTable";
import { Customer } from "@/services/customerService/dto";
import { Mechanic } from "@/services/mechanicService/dto";
import { OutputStockItemDTO } from "@/services/stockTransactionService/dto";
import { WorkOrderService } from "@/services/workOrderService/service";
import {
  CreateWorkOrderRequestDTO,
  Work,
  WorkOrder,
} from "@/services/workService/dto";
import { WorkService } from "@/services/workService/service";
import { Button, Card, Flex, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

export const WorkViewPage: React.FC = () => {
  const [newOrderVisible, setNewOrderVisible] = useState(false);
  const [selectEditOrder, setSelectEditOrder] =
    useState<CreateWorkOrderRequestDTO>();

  const [resource, setResource] = useState<Work>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { uuid } = useParams();

  const handleCustomerView = (customer: Customer) => {
    navigate(`/app/customers/${customer?.id}`);
  };

  const handleMechanicView = (value: Mechanic) => {
    navigate(`/app/mechanics/${value?.id}`);
  };

  const fetchResource = async (resourceId: string) => {
    setLoading(true);
    try {
      const { data } = await WorkService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [WorkViewPage]", error);
    } finally {
      setLoading(false);
    }
  };

  const mountWorkOrderRequest = (
    workOrder: WorkOrder
  ): CreateWorkOrderRequestDTO => {
    return {
      id: workOrder.id,
      title: workOrder.title,
      description: workOrder.description,
      note: workOrder.note,
      status: workOrder.status,
      cost: workOrder.cost,
      expectedAt: dayjs(workOrder.expectedAt),
      startAt: dayjs(workOrder.startAt),
      stockItems:
        workOrder.stockTransaction?.items.map((item): OutputStockItemDTO => {
          return {
            stockItemId: item.stockItem.id,
            price: item.stockItem.price,
            quantity: item.quantity,
          };
        }) ?? [],
    };
  };

  const createWorkOrder = async (form: CreateWorkOrderRequestDTO) => {
    try {
      const { data } = await WorkOrderService.create(form);
      fetchResource(resource?.id!!);
    } catch (error) {
      console.error("createWorkOrder [WorkViewPage]", error);
    }
  };

  const updateWorkOrder = async (form: CreateWorkOrderRequestDTO) => {
    if (!selectEditOrder) return;

    try {
      const { data } = await WorkOrderService.update(
        selectEditOrder.id!!,
        form
      );
      fetchResource(resource?.id!!);
    } catch (error) {
      console.error("createWorkOrder [WorkViewPage]", error);
    }
  };

  const handlerSubmit = (form: CreateWorkOrderRequestDTO) => {
    const formData = {
      ...form,
      workId: resource?.id,
    };

    if (!!selectEditOrder) updateWorkOrder(formData);
    else createWorkOrder(formData);
  };

  useEffect(() => {
    if (uuid) {
      fetchResource(uuid);
    }
  }, [uuid]);

  if (!resource) return <LoadingContent isLoading />;

  return (
    <>
      <LoadingContent isLoading={loading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <WorkDescription
            title={
              <Flex gap={16} justify="space-between">
                <Typography.Title level={5}>Serviço</Typography.Title>
                <Button
                  onClick={() => {}}
                  className="flex items-center gap-1"
                  type="text"
                >
                  <AiFillEdit />
                  Editar
                </Button>
              </Flex>
            }
            data={resource}
            onCustomerView={handleCustomerView}
            onMechanicView={handleMechanicView}
          />
        </Card>

        {resource?.orders && resource?.orders.length > 0 && (
          <Flex gap={12} vertical key={resource.id}>
            <Flex gap={16} align="center" justify="space-between">
              <Typography.Title level={5}>Ordems de serviço</Typography.Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setNewOrderVisible(true)}
              >
                Novo
              </Button>
            </Flex>

            {resource?.orders.map((workOrder) => (
              <Card>
                <Flex gap={20} vertical>
                  <WorkOrderDescription
                    title={
                      <Flex gap={16} align="center" justify="space-between">
                        <Typography.Title level={5}>
                          Ordem de serviço - {workOrder.id?.substring(0, 8)}
                        </Typography.Title>
                        <Button
                          onClick={() =>
                            setSelectEditOrder(mountWorkOrderRequest(workOrder))
                          }
                          className="flex items-center gap-1"
                          type="text"
                        >
                          <AiFillEdit />
                          Editar
                        </Button>
                      </Flex>
                    }
                    data={workOrder}
                  />

                  <Typography.Title level={5}>Items usados</Typography.Title>
                  <TransactionItemTable
                    dataSource={workOrder.stockTransaction?.items ?? []}
                    pagination={false}
                  />
                </Flex>
              </Card>
            ))}
          </Flex>
        )}
      </Flex>

      <CreateWorkOrderModal
        isOpen={newOrderVisible || !!selectEditOrder}
        onClose={() => {
          setNewOrderVisible(false);
          setSelectEditOrder(undefined);
        }}
        onSubmit={handlerSubmit}
        initialData={selectEditOrder}
      />
    </>
  );
};
