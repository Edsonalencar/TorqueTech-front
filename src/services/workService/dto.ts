import { User } from "@/types/authTypes";
import { Vehicle } from "../vehicleService/dto";
import { Customer } from "../customerService/dto";
import { Garage } from "../garageService/dto";
import { StockTransaction } from "../stockService/dto";

export enum WorkStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum WorkOrderStatus {
  NEW = "NEW",
  APPROVED = "APPROVED",
  COMPLETED = "COMPLETED",
}

export interface Work {
  id: string;
  name: string;
  description: string;
  totalCost: number;
  price: number;
  mechanic: User;
  owner: User;
  status: WorkStatus;
  orders: WorkOrder[];
  vehicle: Vehicle;
  customer: Customer;
  garage: Garage;
}

export interface WorkOrder {
  id: string;
  job: Work;
  status: WorkOrderStatus;
  name: string;
  description: string;
  cost: number;
  items: StockTransaction[];
}
