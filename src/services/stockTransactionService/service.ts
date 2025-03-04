import { GenericService } from "../genericService/genericService";

export class IStockTransactionService extends GenericService {}

export const StockTransactionService = new IStockTransactionService(
  "/stock-transaction"
);
