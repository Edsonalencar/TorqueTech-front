import { BasePagination } from "@/components/atoms/BasePagination";
import { Pageable } from "@/types";
import { ActiveStatus } from "@/types/authTypes";
import { Button, Card, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ItemStock } from "@/services/itemStockService/dto";
import { ItemStockService } from "@/services/itemStockService/service";
import { ItemStockTable } from "@/components/molecules/tables/ItemStockTable";
import { CreateItemStockModal } from "@/components/molecules/modais/CreateItemStockModal";

type ConfigType = ItemStock;
const Service = ItemStockService;

export const ItemStockConfig = () => {
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
  const [selectedEdit, setSelectedEdit] = useState<ConfigType>();
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [resource, setResource] = useState<Pageable<ConfigType>>();
  const [status, setStatus] = useState<ActiveStatus>(ActiveStatus.ACTIVE);

  const fetchPage = async (query?: string) => {
    setLoading(true);
    try {
      const { data } = await Service.getPage(page, {
        query,
        status,
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
  }, [page, status]);

  return (
    <Card>
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex justify="space-between">
          <Typography.Title level={4}>Items de estoque</Typography.Title>
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
              placeholder="Pesquise pelo nome..."
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
          <ItemStockTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onEdit={(entity) => setSelectedEdit(entity)}
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateItemStockModal
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
