import { User } from "@/types/authTypes";
import { Vehicle } from "../vehicleService/dto";
import { Customer } from "../customerService/dto";
import { Garage } from "../garageService/dto";
import { StockTransaction } from "../stockService/dto";

export enum WorkStatus {
  PENDING = "PENDING", // Serviço criado, aguardando início
  IN_PROGRESS = "IN_PROGRESS", // Serviço em andamento
  WAITING_PARTS = "WAITING_PARTS", // Aguardando peças ou materiais
  ON_HOLD = "ON_HOLD", // Pausado por algum motivo (aguardando aprovação do cliente, pagamento, etc.)
  COMPLETED = "COMPLETED", // Serviço concluído
  CANCELED = "CANCELED", // Serviço cancelado
  DELIVERED = "DELIVERED", // Veículo foi entregue ao cliente
  INVOICED = "INVOICED", // Fatura gerada, aguardando pagamento
  PAID = "PAID", // Pagamento efetuado
  CANCELLED = "CANCELLED", // Serviço cancelado (duplicado de CANCELED)
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
  createdAt: string;
}

export interface WorkOrder {
  id: string;
  job: Work;
  status: WorkOrderStatus;
  name: string;
  description: string;
  cost: number;
  items: StockTransaction[];
  createdAt: string;
}
