import { UserStatus } from "@/types/authTypes";
import { ResponseDTO } from "../baseApi/interface";
import { GenericService } from "../genericService/genericService";

export class IGarageService extends GenericService {
  disable = async <T>(id: string, data: UserStatus) => {
    const res = await this.getApi().put<ResponseDTO<T>, String>(
      `${this.getURL()}/${id}/status`,
      data
    );
    return res;
  };
}

export const GarageService = new IGarageService("/garage");
