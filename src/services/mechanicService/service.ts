import { BaseApi } from "../baseApi/baseAPI";
import { GenericService } from "../genericService/genericService";
import { IApiService } from "../genericService/interface";

var instance = new BaseApi() as IApiService;

export class IMechanicService extends GenericService {}

export const MechanicService = new IMechanicService("/mechanic", instance);
