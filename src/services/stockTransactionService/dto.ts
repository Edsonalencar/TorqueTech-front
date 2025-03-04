import { User } from "@/types/authTypes";
import { Garage } from "../garageService/dto";

export interface GetPageStockTransactionRequest {
  size?: number;
  itemsIs?: string[];
  ids?: string[];
  ownerId?: string;
  transactionType?: TransactionType;
  category?: TransactionCategoryIn | TransactionCategoryOut;
  query?: string;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
  garage: Garage;
}

export interface StockItem {
  id: string;
  item: Item;
  price: number;
  quantity: number;
  garage: Garage;
}

export interface StockTransaction {
  id: string;
  transactionType: TransactionType;
  category: TransactionCategoryIn | TransactionCategoryOut;
  garage: Garage;
  owner: User;
  item: StockItem;
  quantity: number;
  unitPrice: number;
  transactionDate: string; // ISO 8601 (YYYY-MM-DDTHH:mm:ss)
}

export enum TransactionType {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export enum TransactionCategoryIn {
  PURCHASE = "PURCHASE", // Compra de novos itens para o estoque
  RETURN = "RETURN", // Devolução de itens ao estoque
  TRANSFER = "TRANSFER", // Transferência de itens entre garagens ou unidades (entrada)
  WARRANTY_REPLACEMENT = "WARRANTY_REPLACEMENT", // Substituição de itens sob garantia (entrada)
}

export enum TransactionCategoryOut {
  SALE = "SALE", // Venda de itens para clientes
  WORK_ORDER = "WORK_ORDER", // Uso de itens em ordens de serviço
  DISPOSAL = "DISPOSAL", // Descarte de itens danificados ou sem utilidade
  TRANSFER = "TRANSFER", // Transferência de itens entre garagens ou unidades (saída)
}
