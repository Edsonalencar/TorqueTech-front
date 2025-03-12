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
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { OutputStockTransactionModal } from "@/components/molecules/modais/OutputStockTransactionModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const StockOutputPage = () => {
  const [resource, setResource] = useState<Pageable<StockTransaction>>();
  const [status, setStatus] = useState<TransactionCategoryIn>();

  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createStockTransactionModal, setCreateStockTransactionModal] =
    useState<boolean>(false);
  const [selectedStockTransactionManager, setSelectedStockTransactionManager] =
    useState<StockTransaction>();

  const navigate = useNavigate();

  const handlerView = (item: StockTransaction) => {
    navigate(`/app/stocks/${item?.id}`);
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

  useEffect(() => {
    fetchPage();
  }, [page, status]);

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Card>
        <Flex gap={20} vertical className="overflow-hidden">
          <Flex justify="space-between">
            <Typography.Title level={4} className="whitespace-nowrap">Saída estoque</Typography.Title>
            <Flex gap={8}>
              <SelectSearchInput
                placeholder="Filtre por catégoria"
                onSelect={(value) => setStatus(value as TransactionCategoryIn)}
                options={transactionCategoryOutOptions}
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

      <OutputStockTransactionModal
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
