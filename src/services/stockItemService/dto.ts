import { ItemStock } from "../itemStockService/dto";
import { LocalStock } from "../localStockService/dto";

export interface StockItem {
  id: string;
  acquisitionPrice: number;
  price: number;
  quantity: number;
  item: ItemStock;
  local?: LocalStock;
  garageId: string;
  acquisitionAt?: string;
  createdAt: string;
}
