import { ActiveStatus } from "@/types/authTypes";

export interface CreateLocalStockRequest {
  name: string;
  description?: string;
}

export interface Local {
  id: string;
  name: string;
  description?: string;
  status: ActiveStatus;
  garageId: string;
  createdAt: string;
}
