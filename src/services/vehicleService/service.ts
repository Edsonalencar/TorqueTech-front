import { GenericService } from "../genericService/genericService";

export class IVehicleService extends GenericService {
  getAllByCustomer = async <T>(customerId: string) => {
    return (await this.getApi().get<T>(
      `${this.getURL()}/customer/${customerId}`
    )) as T;
  };
}

export const VehicleService = new IVehicleService("/vehicle");
