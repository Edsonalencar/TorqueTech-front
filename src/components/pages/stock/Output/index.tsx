import { BasePagination } from "@/components/atoms/BasePagination";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { StockTransactionTable } from "@/components/molecules/tables/StockTransactionTable";
import {
  StockTransaction,
  TransactionCategoryIn,
  GetPageStockTransactionRequest,
  TransactionType,
} from "@/services/stockTransactionService/dto";
import { StockTransactionService } from "@/services/stockTransactionService/service";
import { Pageable } from "@/types";
import { transactionCategoryOutOptions } from "@/utils/utils";
import { Card, Flex, Typography, Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export const StockOutputPage = () => {
  const [resource, setResource] = useState<Pageable<StockTransaction>>();
  const [status, setStatus] = useState<TransactionCategoryIn>();

  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createStockTransactionModal, setCreateStockTransactionModal] =
    useState<boolean>(false);
  const [selectedStockTransactionManager, setSelectedStockTransactionManager] =
    useState<StockTransaction>();

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await StockTransactionService.getPage<
        Pageable<StockTransaction>,
        GetPageStockTransactionRequest
      >(page, {
        category: status,
        query: name,
        transactionType: TransactionType.OUTPUT,
      });
      console.log("fetchManagers", data);
      setResource(data);
    } catch (error) {
      console.error("fetchManagers", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Card>
        <Flex gap={20} vertical className="overflow-hidden">
          <Flex justify="space-between">
            <Typography.Title level={4}>Entrada estoque</Typography.Title>
            <Flex gap={8}>
              <SelectSearchInput
                placeholder="Filtre por catégoria"
                onSelect={(value) => setStatus(value as TransactionCategoryIn)}
                options={transactionCategoryOutOptions}
                className="w-56"
              />
              <Search
                placeholder="Pesquise um produtor..."
                allowClear
                onSearch={(value) => fetchPage(value)}
                style={{ width: 304 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateStockTransactionModal(true)}
              >
                Saída de Estoque
              </Button>
            </Flex>
          </Flex>

          <Flex gap={20} vertical>
            <StockTransactionTable
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
