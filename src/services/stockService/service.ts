import { GenericService } from "../genericService/genericService";

export class IStockService extends GenericService {}

export const StockService = new IStockService("/stock");
