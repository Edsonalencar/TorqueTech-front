import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { ProfileWitchEmailDescription } from "@/components/molecules/Descriptions/ProfileWitchEmailDescription";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";
import { CreateCustomerModal } from "@/components/molecules/modais/CreateCustomerModal";
import { AddressDescription } from "@/components/molecules/Descriptions/AddressDescription";
import { Vehicle } from "@/services/vehicleService/dto";
import { CreateVehicleModal } from "@/components/molecules/modais/CreateVehicleModal";
import { VehicleService } from "@/services/vehicleService/service";
import { Pageable } from "@/types";
import { BasePagination } from "@/components/atoms/BasePagination";
import Search from "antd/es/input/Search";
import { VehicleTable } from "@/components/molecules/tables/VehicleTable";
import { PlusOutlined } from "@ant-design/icons";
import { Work } from "@/services/workService/dto";
import { WorkTable } from "@/components/molecules/tables/WorkTable";
import { formatLicensePlate } from "@/utils/formaters/format";

export const ViewCustomerPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<Customer>();
  const [canEdit, setCanEdit] = useState(false);

  const [addVehicle, setAddVehicle] = useState(false);
  const [selectedEditVehicle, setSelectedEditVehicle] = useState<Vehicle>();
  const [vehicleResource, setVehicleResource] = useState<Pageable<Vehicle>>();
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [vehiclePage, setVehiclePage] = useState(0);

  const [workResource, setWorkResource] = useState<Pageable<Work>>();
  const [workLoading, setWorkLoading] = useState(false);
  const [workPage, setWorkPage] = useState(0);

  const { uuid } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await CustomerService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [ViewCustomerPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const fetchVehicles = async (value: string = "") => {
    setVehicleLoading(true);
    try {
      const { data } = await VehicleService.getPage(vehiclePage, {
        query: value,
      });
      setVehicleResource(data);
    } catch (error) {
      console.error("fetchVehicles [ViewCustomerPage]", error);
    } finally {
      setVehicleLoading(false);
    }
  };

  const reload = async () => {
    if (!uuid) return;
    await fetchResource(uuid);
    await fetchVehicles();
  };

  useEffect(() => {
    if (uuid) fetchResource(uuid);
  }, [uuid]);

  useEffect(() => {
    fetchVehicles();
  }, [vehiclePage]);

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <Flex gap={20} vertical>
            <ProfileWitchEmailDescription
              title={
                <Flex gap={16} justify="space-between">
                  <Typography.Title level={5}>Cliente</Typography.Title>
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
                ...resource?.profile,
                owner: resource?.owner,
                email: resource?.email,
              }}
            />

            {resource?.profile?.address && (
              <AddressDescription address={resource?.profile.address} />
            )}
          </Flex>
        </Card>

        <Card>
          <Flex gap={20} vertical>
            <Flex justify="space-between">
              <Typography.Title level={4} className="whitespace-nowrap">
                Veículos
              </Typography.Title>
              <Flex gap={8}>
                <Search
                  placeholder="Pesquise por placa.."
                  allowClear
                  onSearch={(value) => fetchVehicles(value)}
                  onChange={(event) => fetchVehicles(event.target.value)}
                  style={{ width: 304 }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setAddVehicle(true)}
                >
                  Novo veículo
                </Button>
              </Flex>
            </Flex>

            <Flex gap={20} vertical>
              <VehicleTable
                dataSource={vehicleResource?.content ?? []}
                pagination={false}
                loading={vehicleLoading}
                onEdit={setSelectedEditVehicle}
              />

              <BasePagination
                page={vehiclePage}
                setPage={setVehiclePage}
                pageable={vehicleResource}
              />
            </Flex>
          </Flex>
        </Card>

        <Card>
          <Flex gap={20} vertical>
            <Flex justify="space-between">
              <Typography.Title level={4} className="whitespace-nowrap">
                Histórico de Serviços
              </Typography.Title>
              <Flex gap={8}>
                <Search
                  placeholder="Pesquise por placa.."
                  allowClear
                  onSearch={(value) => fetchVehicles(value)}
                  style={{ width: 304 }}
                />
                <Button type="primary" icon={<PlusOutlined />}>
                  Novo serviço
                </Button>
              </Flex>
            </Flex>

            <Flex gap={20} vertical>
              <WorkTable
                dataSource={workResource?.content ?? []}
                pagination={false}
                loading={workLoading}
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

      <CreateCustomerModal
        isOpen={canEdit}
        onClose={() => setCanEdit(false)}
        initialData={resource}
        reload={reload}
      />

      <CreateVehicleModal
        isOpen={addVehicle || !!selectedEditVehicle}
        onClose={() => {
          setAddVehicle(false);
          setSelectedEditVehicle(undefined);
        }}
        customerId={resource?.id}
        initialData={selectedEditVehicle}
        reload={reload}
      />
    </>
  );
};
