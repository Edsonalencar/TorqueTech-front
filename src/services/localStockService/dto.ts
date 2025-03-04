import { ActiveStatus } from "@/types/authTypes";

export interface CreateLocalStockRequest {
  name: string;
  description?: string;
}

export interface LocalStock {
  id: string;
  name: string;
  description?: string;
  status: ActiveStatus;
  garageId: string;
  createdAt: string;
}
