import { Button, Card, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { BasePagination } from "@/components/atoms/BasePagination";
import { CreateGarageModal } from "@/components/molecules/modais/CreateGarageModal";
import { GarageTable } from "@/components/molecules/tables/GarageTable";
import { Garage } from "@/services/garageService/dto";
import { Pageable } from "@/types";
import { GarageService } from "@/services/garageService/service";
import { UserStatus } from "@/types/authTypes";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const [createGarageModal, setCreateGarageModal] = useState<boolean>(false);
  const [selectedEditGarage, setSelectedEditGarage] = useState<Garage>();
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [resource, setResource] = useState<Pageable<Garage>>();

  const navigate = useNavigate();

  const handleView = (value: Garage) => {
    navigate(`/app/managers/${value.owner.id}`);
  };

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await GarageService.getPage(page, {
        name,
      });
      console.log("fetchGarage", data);
      setResource(data);
    } catch (error) {
      console.error("fetchGarage", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (value: Garage) => {
    setLoading(true);
    try {
      await GarageService.disable(
        value.id as string,
        value.owner?.status == UserStatus.ACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE
      );
      await fetchPage();
    } catch (error) {
      console.error("handleDisable", error);
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
          <Typography.Title level={4}>Garagens</Typography.Title>
          <Flex gap={8}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateGarageModal(true)}
            >
              Nova garagem
            </Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
          <GarageTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateGarageModal
        isOpen={createGarageModal || !!selectedEditGarage}
        onClose={() => {
          setCreateGarageModal(false);
          setSelectedEditGarage(undefined);
        }}
        initialData={selectedEditGarage}
        reload={fetchPage}
      />
    </Card>
  );
};
