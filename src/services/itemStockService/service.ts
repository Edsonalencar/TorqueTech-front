import { ActiveStatus } from "@/types/authTypes";
import { GenericService } from "../genericService/genericService";

export class IItemStockService extends GenericService {
  updateStatus = async (id: string, data: { status: ActiveStatus }) => {
    return await this.getApi().put(`${this.getURL()}/${id}/status`, data);
  };
}

export const ItemStockService = new IItemStockService("/item");
