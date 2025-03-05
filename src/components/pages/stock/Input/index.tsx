import { BasePagination } from "@/components/atoms/BasePagination";
import {
  GetPageStockTransactionRequest,
  StockTransaction,
  TransactionCategoryIn,
  TransactionType,
} from "@/services/stockTransactionService/dto";
import { Pageable } from "@/types";
import { Button, Card, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { StockTransactionTable } from "@/components/molecules/tables/StockTransactionTable";
import { StockTransactionService } from "@/services/stockTransactionService/service";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { transactionCategoryInOptions } from "@/utils/utils";
import { toast } from "react-toastify";
import { InputStockTransactionModal } from "@/components/molecules/modais/InputStockTransactionModal";

export const StockInputPage = () => {
  const [resource, setResource] = useState<Pageable<StockTransaction>>();
  const [status, setStatus] = useState<TransactionCategoryIn>();

  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createStockTransactionModal, setCreateStockTransactionModal] =
    useState<boolean>(false);
  const [selectedStockTransactionManager, setSelectedStockTransactionManager] =
    useState<StockTransaction>();

  const handlerView = (item: StockTransaction) => {
    console.log("handlerView", item);
  };

  const handlerCancel = async (item: StockTransaction) => {
    setLoading(true);
    try {
      await StockTransactionService.cancel(item.id);
      toast.success("Transação cancelada com sucesso");
      fetchPage();
    } catch (error) {
      console.error("fetchManagers", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await StockTransactionService.getPage<
        Pageable<StockTransaction>,
        GetPageStockTransactionRequest
      >(page, {
        category: status,
        query: name,
        transactionType: TransactionType.INPUT,
      });
      console.log("fetchManagers", data);
      setResource(data);
    } catch (error) {
      console.error("fetchManagers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page, status]);

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
                options={transactionCategoryInOptions}
                className="w-56"
                onClear={() => setStatus(undefined)}
                allowClear
              />
              <Search
                placeholder="Pesquise um item..."
                allowClear
                onSearch={(value) => fetchPage(value)}
                style={{ width: 304 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateStockTransactionModal(true)}
              >
                Novo
              </Button>
            </Flex>
          </Flex>

          <Flex gap={20} vertical>
            <StockTransactionTable
              dataSource={resource?.content ?? []}
              pagination={false}
              loading={loading}
              onView={handlerView}
              onCancel={handlerCancel}
              onEdit={(item) => setSelectedStockTransactionManager(item)}
            />

            <BasePagination page={page} setPage={setPage} pageable={resource} />
          </Flex>
        </Flex>
      </Card>

      <InputStockTransactionModal
        isOpen={
          createStockTransactionModal || !!selectedStockTransactionManager
        }
        onClose={() => {
          setCreateStockTransactionModal(false);
          setSelectedStockTransactionManager(undefined);
        }}
        initialData={selectedStockTransactionManager}
        reload={fetchPage}
      />
    </>
  );
};
