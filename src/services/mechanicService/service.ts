import { BaseApi } from "../baseApi/baseAPI";
import { ResponseDTO } from "../baseApi/interface";
import { GenericService } from "../genericService/genericService";
import { IApiService } from "../genericService/interface";

var instance = new BaseApi() as IApiService;

export class IMechanicService extends GenericService {
  disable = async <T>(managerId: string, data: "ACTIVE" | "INACTIVE") => {
    const res = await this.getApi().put<ResponseDTO<T>, String>(
      `${this.getURL()}/${managerId}/status`,
      data
    );
    return res;
  };
}

export const MechanicService = new IMechanicService("/mechanics", instance);
