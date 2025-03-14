import { GenericService } from "../genericService/genericService";
import { WorkStatusRequest } from "./dto";

export class IWorkService extends GenericService {
  updateStatus = async <T>(workId: string, data: WorkStatusRequest) => {
    return (await this.getApi().put<T>(
      `${this.getURL()}/${workId}/status`,
      data
    )) as T;
  };
}

export const WorkService = new IWorkService("/work");
