import { User } from "@/types/authTypes";
import { Garage } from "../garageService/dto";

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
  garage: Garage;
  owner: User;
  item: StockItem;
  quantity: number;
  unitPrice: number;
  transactionDate: string; // ISO 8601 (YYYY-MM-DDTHH:mm:ss)
}

export enum TransactionType {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
  CONSUMPTION = "CONSUMPTION",
}
