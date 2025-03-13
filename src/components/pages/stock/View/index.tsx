import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import {
  StockTransaction,
  TransactionType,
} from "@/services/stockTransactionService/dto";
import { StockTransactionService } from "@/services/stockTransactionService/service";
import { StockTransactionDescription } from "@/components/molecules/Descriptions/StockTransactionDescription";
import { OutputStockTransactionModal } from "@/components/molecules/modais/OutputStockTransactionModal";
import { InputStockTransactionModal } from "@/components/molecules/modais/InputStockTransactionModal";
import { TransactionItemTable } from "@/components/molecules/tables/TransactionItemTable";
import { ItemStock } from "@/services/itemStockService/dto";
import { LocalStock } from "@/services/localStockService/dto";
import { LocalStockService } from "@/services/localStockService/service";
import { ItemStockService } from "@/services/itemStockService/service";
import { CreateLocalModal } from "@/components/molecules/modais/CreateLocalModal";
import { CreateItemStockModal } from "@/components/molecules/modais/CreateItemStockModal";

export const StockViewPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<StockTransaction>();
  const [itemsStock, setItemsStock] = useState<ItemStock[]>([]);
  const [localStock, setLocalStock] = useState<LocalStock[]>([]);

  const [addLocalModalVisible, setAddLocalModalVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);

  const [localLoading, setLocalLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);

  const [canEditOut, setCanEditOut] = useState(false);
  const [canEditInp, setCanEditInp] = useState(false);

  const openEditByType = (type: TransactionType) => {
    if (type == TransactionType.INPUT) setCanEditInp(true);
    else setCanEditOut(true);
  };

  const { uuid } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await StockTransactionService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [StockViewPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const fetchLocal = async () => {
    setLocalLoading(true);
    try {
      const { data } = await LocalStockService.get();
      setLocalStock(data);
    } catch (error) {
      console.error("fetchLocal [StockViewPage]", error);
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

  const reload = async () => {
    if (!uuid) return;
    await fetchResource(uuid);
  };

  useEffect(() => {
    if (uuid) {
      fetchResource(uuid);
      fetchLocal();
      fetchItems();
    }
  }, [uuid]);

  if (!resource) return <LoadingContent isLoading />;

  return (
    <>
      <LoadingContent
        isLoading={resourceLoading || itemLoading || localLoading}
      />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <StockTransactionDescription
            title={
              <Flex gap={16} justify="space-between">
                <Typography.Title level={5}>
                  Transação de Estoque
                </Typography.Title>
                <Button
                  onClick={() => openEditByType(resource.type)}
                  className="flex items-center gap-1"
                  type="text"
                >
                  <AiFillEdit />
                  Editar
                </Button>
              </Flex>
            }
            data={resource}
          />
        </Card>

        <Card>
          <Typography.Title level={5}>Items movimentados</Typography.Title>
          <TransactionItemTable
            dataSource={resource.items ?? []}
            pagination={false}
          />
        </Card>
      </Flex>

      <InputStockTransactionModal
        isOpen={canEditInp}
        onClose={() => setCanEditInp(false)}
        initialData={resource}
        itemsStock={itemsStock}
        localStock={localStock}
        onAddItem={() => setAddItemModalVisible?.(true)}
        onAddLocal={() => setAddLocalModalVisible?.(true)}
        reload={reload}
      />

      <OutputStockTransactionModal
        isOpen={canEditOut}
        onClose={() => setCanEditOut(false)}
        initialData={resource}
        reload={reload}
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
