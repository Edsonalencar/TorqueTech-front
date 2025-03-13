import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { WorkDescription } from "@/components/molecules/Descriptions/WorkDescription";
import { WorkOrderDescription } from "@/components/molecules/Descriptions/WorkOrderDescription";
import { TransactionItemTable } from "@/components/molecules/tables/TransactionItemTable";
import { Customer } from "@/services/customerService/dto";
import { Mechanic } from "@/services/mechanicService/dto";
import { Work } from "@/services/workService/dto";
import { WorkService } from "@/services/workService/service";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

export const WorkViewPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resource, setResource] = useState<Work>();

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
            <Typography.Title level={5}>Ordems de serviço</Typography.Title>
            {resource?.orders.map((workOrder) => (
              <Card>
                <Flex gap={20} vertical>
                  <WorkOrderDescription data={workOrder} />

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
    </>
  );
};
