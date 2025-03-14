import { Button, Card, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { Pageable } from "@/types";
import { useEffect, useState } from "react";
import { ManagerTable } from "@/components/molecules/tables/ManagerTable";
import { BasePagination } from "@/components/atoms/BasePagination";
import { CreateManagerModal } from "@/components/molecules/modais/CreateManagerModal";
import { useNavigate } from "react-router-dom";
import { Manager } from "@/services/managersService/dto";
import { ManagerService } from "@/services/managersService/service";
import { UserStatus } from "@/types/authTypes";
import { UserService } from "@/services/userService/service";

export const managerPage: React.FC = () => {
  const [resource, setResource] = useState<Pageable<Manager>>();
  const [status, setStatus] = useState<UserStatus>(UserStatus.ACTIVE);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createManagerModal, setCreateManagerModal] = useState<boolean>(false);
  const [selectedEditManager, setSelectedEditManager] = useState<Manager>();

  const navigate = useNavigate();

  const handleView = (manager: Manager) => {
    navigate(`/app/managers/${manager?.id}`);
  };

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await ManagerService.getPage(page, {
        status,
        name,
      });
      console.log("fetchManagers", data);
      setResource(data);
    } catch (error) {
      console.error("fetchManagers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (value: Manager) => {
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
    <Card>
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex justify="space-between">
          <Typography.Title level={4} className="whitespace-nowrap">Gestores</Typography.Title>
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
              onClick={() => setCreateManagerModal(true)}
            >
              Novo Gestor
            </Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
          <ManagerTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
            onEdit={(manager) => setSelectedEditManager(manager)}
            onDisable={
              status === "ACTIVE"
                ? (manager) => handleChangeStatus(manager)
                : undefined
            }
            onEnable={
              status === "INACTIVE"
                ? (manager) => handleChangeStatus(manager)
                : undefined
            }
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateManagerModal
        isOpen={createManagerModal || !!selectedEditManager}
        onClose={() => {
          setCreateManagerModal(false);
          setSelectedEditManager(undefined);
        }}
        initialData={selectedEditManager}
        reload={fetchPage}
      />
    </Card>
  );
};
