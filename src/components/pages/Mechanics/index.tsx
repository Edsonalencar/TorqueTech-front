import { Button, Card, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { Pageable } from "@/types";
import { useEffect, useState } from "react";
import { BasePagination } from "@/components/atoms/BasePagination";
import { CreateMechanicModal } from "@/components/molecules/modais/CreateMechanicModal";
import { useNavigate } from "react-router-dom";
import { UserStatus } from "@/types/authTypes";
import { Mechanic } from "@/services/mechanicService/dto";
import { MechanicService } from "@/services/mechanicService/service";
import { MechanicTable } from "@/components/molecules/tables/MachanicTable";
import { UserService } from "@/services/userService/service";

export const MechanicPage: React.FC = () => {
  const [resource, setResource] = useState<Pageable<Mechanic>>();
  const [status, setStatus] = useState<UserStatus>(UserStatus.ACTIVE);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createMechanicModal, setCreateMechanicModal] =
    useState<boolean>(false);
  const [selectedEditMechanic, setSelectedEditMechanic] = useState<Mechanic>();

  const navigate = useNavigate();

  const handleView = (Mechanic: Mechanic) => {
    navigate(`/app/mechanics/${Mechanic?.id}`);
  };

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await MechanicService.getPage(page, {
        status,
        name,
      });
      console.log("fetchMechanics", data);
      setResource(data);
    } catch (error) {
      console.error("fetchMechanics", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (value: Mechanic) => {
    setLoading(true);

    try {
      await UserService.updateStatus(
        value.user!.id as string,
        value.user?.status == UserStatus.ACTIVE
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
    <Card
      title={
        <Flex justify="space-between">
          <Typography.Title level={4} className="whitespace-nowrap">
            Mecânicos
          </Typography.Title>
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
              placeholder="Pesquise um produtor..."
              allowClear
              onSearch={(value) => fetchPage(value)}
              style={{ width: 304 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateMechanicModal(true)}
            >
              Novo Mecânico
            </Button>
          </Flex>
        </Flex>
      }
    >
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex gap={20} vertical>
          <MechanicTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
            onEdit={(Mechanic) => setSelectedEditMechanic(Mechanic)}
            onDisable={
              status === "ACTIVE"
                ? (Mechanic) => handleChangeStatus(Mechanic)
                : undefined
            }
            onEnable={
              status === "INACTIVE"
                ? (Mechanic) => handleChangeStatus(Mechanic)
                : undefined
            }
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateMechanicModal
        isOpen={createMechanicModal || !!selectedEditMechanic}
        onClose={() => {
          setCreateMechanicModal(false);
          setSelectedEditMechanic(undefined);
        }}
        initialData={selectedEditMechanic}
        reload={fetchPage}
      />
    </Card>
  );
};
