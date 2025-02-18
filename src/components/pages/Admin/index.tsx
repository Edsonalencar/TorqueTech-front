import { Button, Card, Flex, Radio, Typography } from "antd";
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
import Search from "antd/es/input/Search";

export const AdminPage = () => {
  const [createGarageModal, setCreateGarageModal] = useState<boolean>(false);
  const [selectedEditGarage, setSelectedEditGarage] = useState<Garage>();
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [resource, setResource] = useState<Pageable<Garage>>();
  const [status, setStatus] = useState<UserStatus>(UserStatus.ACTIVE);

  const navigate = useNavigate();

  const handleView = (value: Garage) => {
    navigate(`/admin/${value.id}`);
  };

  const fetchPage = async (query?: string) => {
    setLoading(true);
    try {
      const { data } = await GarageService.getPage(page, {
        query,
        status,
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
      console.error("Handle garage disable", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page, status]);

  return (
    <Card>
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex justify="space-between">
          <Typography.Title level={4}>Garagens</Typography.Title>
          <Flex gap={8}>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="ACTIVE">Ativos</Radio.Button>
              <Radio.Button value="INACTIVE">Inativos</Radio.Button>
            </Radio.Group>
            <Search
              placeholder="Pesquise um nome da garagem ou do proprietário..."
              allowClear
              onSearch={(value) => fetchPage(value)}
              style={{ width: 304 }}
            />
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
