import { GenericService } from "../genericService/genericService";

export class IStockItemService extends GenericService {}

export const StockItemService = new IStockItemService("/stock-item");
