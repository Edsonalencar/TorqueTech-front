import { BasePagination } from "@/components/atoms/BasePagination";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { StockItemTable } from "@/components/molecules/tables/StockItemTable";
import { StockItem } from "@/services/stockItemService/dto";
import { StockItemService } from "@/services/stockItemService/service";
import { Pageable } from "@/types";
import { Card, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";

export const StockItemsPage = () => {
  const [resource, setResource] = useState<Pageable<StockItem>>();
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await StockItemService.getPage(page, {
        query: name,
      });
      setResource(data);
    } catch (error) {
      console.error("StockItemsPage", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page]);

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Card
        title={
          <Flex justify="space-between">
            <Typography.Title level={5} className="whitespace-nowrap">
              Catálogo de produtos
            </Typography.Title>
            <Flex gap={8}>
              <Search
                placeholder="Pesquise um item..."
                allowClear
                onSearch={(value) => fetchPage(value)}
                style={{ width: 304 }}
              />
            </Flex>
          </Flex>
        }
      >
        <Flex gap={20} vertical className="overflow-hidden">
          <Flex gap={20} vertical>
            <StockItemTable
              dataSource={resource?.content ?? []}
              pagination={false}
              loading={loading}
            />
            <BasePagination page={page} setPage={setPage} pageable={resource} />
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
