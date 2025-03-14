import { BaseApi } from "../baseApi/baseAPI";
import { GenericService } from "../genericService/genericService";
import { IApiService } from "../genericService/interface";

const instance = new BaseApi() as IApiService;

export class IManagerService extends GenericService {}

export const ManagerService = new IManagerService("/manager", instance);
