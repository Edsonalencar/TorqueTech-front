import { User } from "@/types/authTypes";
import { Vehicle } from "../vehicleService/dto";
import { Customer } from "../customerService/dto";
import { Garage } from "../garageService/dto";
import {
  OutputStockItemDTO,
  StockTransaction,
} from "../stockTransactionService/dto";
import { Mechanic } from "../mechanicService/dto";
import { Dayjs } from "dayjs";

export enum WorkOrderStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  WAITING_PARTS = "WAITING_PARTS",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
  DELETED = "DELETED",
}

export enum WorkStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  WAITING_PARTS = "WAITING_PARTS",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
  INVOICED = "INVOICED",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export interface Work {
  id: string;
  title: string;
  description: string;
  totalCost: number;
  price: number;
  status: WorkStatus;
  mechanic?: Mechanic;
  owner: User;
  vehicle: Vehicle;
  customer: Customer;
  garage: Garage;
  orders: WorkOrder[];
  startAt?: string;
  concludedAt?: string;
  expectedAt?: string;
  cancelledAt?: string;
  createdAt: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  note: string;
  cost: number;
  status: WorkOrderStatus;
  stockTransaction?: StockTransaction;
  work: Work;
  startAt?: string;
  concludedAt?: string;
  expectedAt?: string;
  deletedAt?: string;
  createdAt: string;
}

export interface CreateWorkOrderRequestDTO {
  id?: string;
  title: string;
  description: string;
  note: string;
  status: WorkOrderStatus;
  startAt?: string | Dayjs;
  expectedAt?: string | Dayjs;
  cost: number;
  stockItems: OutputStockItemDTO[];
  workId?: string;
}

export interface CreateWorkRequestDTO {
  title: string;
  description: string;
  startAt?: string;
  expectedAt?: string;
  price: number;
  totalCost: number;
  workOrders: CreateWorkOrderRequestDTO[];
  mechanicId: string;
  vehicleId: string;
  customerId: string;
}
