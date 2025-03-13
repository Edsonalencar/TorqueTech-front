import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { ProfileWitchEmailDescription } from "@/components/molecules/Descriptions/ProfileWitchEmailDescription";
import { CreateMechanicModal } from "@/components/molecules/modais/CreateMechanicModal";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { Mechanic } from "@/services/mechanicService/dto";
import { MechanicService } from "@/services/mechanicService/service";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { workStatusOptions } from "@/utils/utils";
import Search from "antd/es/input/Search";
import { WorkTable } from "@/components/molecules/tables/WorkTable";
import { BasePagination } from "@/components/atoms/BasePagination";
import { Pageable } from "@/types";
import { Work, WorkStatus } from "@/services/workService/dto";
import { Customer } from "@/services/customerService/dto";
import { WorkService } from "@/services/workService/service";

export const ViewMechanicPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<Mechanic>();
  const [canEdit, setCanEdit] = useState(false);

  const [workResource, setWorkResource] = useState<Pageable<Work>>();
  const [workLoading, setWorkLoading] = useState(false);
  const [workStatus, setWorkStatus] = useState<WorkStatus>();
  const [workPage, setWorkPage] = useState(0);

  const navigate = useNavigate();
  const { uuid } = useParams();

  const handlerWorkView = (value: Work) => {
    navigate(`/app/services/${value.id}`);
  };

  const handleCustomerView = (customer: Customer) => {
    navigate(`/app/customers/${customer?.id}`);
  };

  const fetchWork = async (query?: string) => {
    setWorkLoading(true);
    try {
      const { data } = await WorkService.getPage(workPage, {
        mechanicId: uuid,
        status: workStatus,
        query,
      });
      setWorkResource(data);
    } catch (error) {
      console.error("WorkPage", error);
    } finally {
      setWorkLoading(false);
    }
  };
  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await MechanicService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [ViewMechanicPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const reload = async () => {
    if (!uuid) return;
    await fetchResource(uuid);
  };

  useEffect(() => {
    if (uuid) fetchResource(uuid);
  }, [uuid]);

  useEffect(() => {
    if (!uuid) return;
    fetchWork();
  }, [workPage, workStatus, uuid]);

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <ProfileWitchEmailDescription
            title={
              <Flex gap={16} justify="space-between">
                <Typography.Title level={5}>Mecânico</Typography.Title>
                <Button
                  onClick={() => setCanEdit(true)}
                  className="flex items-center gap-1"
                  type="text"
                >
                  <AiFillEdit />
                  Editar
                </Button>
              </Flex>
            }
            data={{
              ...resource?.user?.profile,
              email: resource?.user?.auth?.username,
              status: resource?.user?.status,
            }}
          />
        </Card>

        <Card>
          <Flex gap={20} vertical>
            <Flex justify="space-between">
              <Typography.Title level={4} className="whitespace-nowrap">
                Histórico de Serviços
              </Typography.Title>
              <Flex gap={8}>
                <SelectSearchInput
                  placeholder="Filtre por status"
                  onSelect={(value) => setWorkStatus(value as WorkStatus)}
                  options={workStatusOptions}
                  className="w-48"
                  onClear={() => setWorkStatus(undefined)}
                  allowClear
                />
                <Search
                  placeholder="Pesquise um titulo ou placa..."
                  allowClear
                  onSearch={(value) => fetchWork(value)}
                  style={{ width: 304 }}
                />
              </Flex>
            </Flex>

            <Flex gap={20} vertical>
              <WorkTable
                dataSource={workResource?.content ?? []}
                pagination={false}
                loading={workLoading}
                onViewCustomer={handleCustomerView}
                onView={handlerWorkView}
              />

              <BasePagination
                page={workPage}
                setPage={setWorkPage}
                pageable={workResource}
              />
            </Flex>
          </Flex>
        </Card>
      </Flex>

      <CreateMechanicModal
        isOpen={canEdit}
        onClose={() => setCanEdit(false)}
        initialData={resource}
        reload={reload}
      />
    </>
  );
};
