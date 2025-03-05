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

export const StockViewPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<StockTransaction>();

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
      console.error("fetchResource [ViewMechanicPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const reload = async () => {
    if (!uuid) return;
    await fetchResource(uuid);
  };

  useEffect(() => {
    if (uuid) fetchResource(uuid);
  }, [uuid]);

  if (!resource) return <LoadingContent isLoading />;

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

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
                  onClick={() => openEditByType(resource.transactionType)}
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
      </Flex>

      <InputStockTransactionModal
        isOpen={canEditInp}
        onClose={() => setCanEditInp(false)}
        initialData={resource}
        reload={reload}
      />

      <OutputStockTransactionModal
        isOpen={canEditOut}
        onClose={() => setCanEditOut(false)}
        initialData={resource}
        reload={reload}
      />
    </>
  );
};
