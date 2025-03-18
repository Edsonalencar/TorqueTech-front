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
import { useNavigate } from "react-router-dom";
import { ItemStock } from "@/services/itemStockService/dto";
import { LocalStock } from "@/services/localStockService/dto";
import { LocalStockService } from "@/services/localStockService/service";
import { ItemStockService } from "@/services/itemStockService/service";
import { CreateLocalModal } from "@/components/molecules/modais/CreateLocalModal";
import { CreateItemStockModal } from "@/components/molecules/modais/CreateItemStockModal";
import { User } from "@/types/authTypes";

export const StockInputPage = () => {
  const [resource, setResource] = useState<Pageable<StockTransaction>>();
  const [status, setStatus] = useState<TransactionCategoryIn>();
  const [itemsStock, setItemsStock] = useState<ItemStock[]>([]);
  const [localStock, setLocalStock] = useState<LocalStock[]>([]);

  const [addLocalModalVisible, setAddLocalModalVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const [localLoading, setLocalLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);

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

  const handlerViewOwner = (item: User) => {
    navigate(`/app/users/${item?.id}`);
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

  const fetchLocal = async () => {
    setLocalLoading(true);
    try {
      const { data } = await LocalStockService.get();
      setLocalStock(data);
    } catch (error) {
      console.error("fetchLocal [StockTransactionInForm]", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const fetchItems = async () => {
    setItemLoading(true);
    try {
      const { data } = await ItemStockService.get();
      setItemsStock(data);
    } catch (error) {
      console.error("fetchItems [StockTransactionInForm]", error);
    } finally {
      setItemLoading(false);
    }
  };

  useEffect(() => {
    fetchLocal();
    fetchItems();
  }, []);

  useEffect(() => {
    fetchPage();
  }, [page, status]);

  return (
    <>
      <LoadingContent isLoading={loading || itemLoading || localLoading} />
      <>
        <Flex gap={20} vertical className="overflow-hidden">
          <Flex justify="space-between">
            <h2 className="whitespace-nowrap font-semibold text-2xl">
              Entrada estoque
            </h2>
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
              onViewOwner={handlerViewOwner}
              onEdit={(item) => setSelectedStockTransactionManager(item)}
            />

            <BasePagination page={page} setPage={setPage} pageable={resource} />
          </Flex>
        </Flex>
      </>

      <InputStockTransactionModal
        isOpen={
          (createStockTransactionModal || !!selectedStockTransactionManager) &&
          !addItemModalVisible &&
          !addLocalModalVisible
        }
        onClose={() => {
          setCreateStockTransactionModal(false);
          setSelectedStockTransactionManager(undefined);
        }}
        initialData={selectedStockTransactionManager}
        reload={fetchPage}
        itemsStock={itemsStock}
        localStock={localStock}
        onAddItem={() => setAddItemModalVisible(true)}
        onAddLocal={() => setAddLocalModalVisible(true)}
      />

      <CreateLocalModal
        isOpen={!!addLocalModalVisible}
        onClose={() => setAddLocalModalVisible?.(false)}
        reload={fetchLocal}
      />

      <CreateItemStockModal
        isOpen={!!addItemModalVisible}
        onClose={() => setAddItemModalVisible?.(false)}
        reload={fetchItems}
      />
    </>
  );
};
