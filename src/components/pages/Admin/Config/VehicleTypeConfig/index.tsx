import { BasePagination } from "@/components/atoms/BasePagination";
import { CreateVehicleTypeModal } from "@/components/molecules/modais/CreateVehicleTypeModal";
import { VehicleTypeTable } from "@/components/molecules/tables/VehicleTypeTable";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import { VehicleTypeService } from "@/services/vehicleTypeService/service";
import { Pageable } from "@/types";
import { User } from "@/types/authTypes";
import { Button, Card, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

type ConfigType = VehicleType;
const Service = VehicleTypeService;

export const VehicleTypeConfig = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
  const [selectedEdit, setSelectedEdit] = useState<ConfigType>();
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [resource, setResource] = useState<Pageable<ConfigType>>();

  const navigate = useNavigate();

  const handleView = (user: User) => {
    navigate(`/admin/user/${user?.id}`);
  };

  const fetchPage = async (query?: string) => {
    setLoading(true);
    try {
      const { data } = await Service.getPage(page, {
        query,
      });
      setResource(data);
    } catch (error) {
      console.error("fetchPage [VehicleTypeConfig]", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page]);

  return (
    <Card>
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex justify="space-between">
          <Typography.Title level={4} className="whitespace-nowrap">Tipos de veículos</Typography.Title>
          <Flex gap={8}>
            <Search
              placeholder="Pesquise um marca ou modelo..."
              allowClear
              onSearch={(value) => fetchPage(value)}
              style={{ width: 304 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalIsOpen(true)}
            >
              Novo
            </Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
          <VehicleTypeTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
            onEdit={(entity) => setSelectedEdit(entity)}
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateVehicleTypeModal
        isOpen={createModalIsOpen || !!selectedEdit}
        onClose={() => {
          setCreateModalIsOpen(false);
          setSelectedEdit(undefined);
        }}
        initialData={selectedEdit}
        reload={fetchPage}
      />
    </Card>
  );
};
