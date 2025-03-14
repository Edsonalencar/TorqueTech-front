import { MetricRequest } from "@/types";
import { GenericService } from "../genericService/genericService";
import { ResponseDTO } from "../baseApi/interface";

export class IDashboardService extends GenericService {
  getMetrics = async <T>(data: MetricRequest) => {
    return (await this.getApi().post<ResponseDTO<T>>(
      `${this.getURL()}/metrics`,
      data
    )) as ResponseDTO<T>;
  };
}

export const DashboardService = new IDashboardService("/dashboard");
