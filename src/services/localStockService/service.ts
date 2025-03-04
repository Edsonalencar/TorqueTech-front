import { ActiveStatus } from "@/types/authTypes";
import { GenericService } from "../genericService/genericService";

export class ILocalStockService extends GenericService {
  updateStatus = async (id: string, data: { status: ActiveStatus }) => {
    return await this.getApi().put(`${this.getURL()}/${id}/status`, data);
  };
}

export const LocalStockService = new ILocalStockService("/local");
