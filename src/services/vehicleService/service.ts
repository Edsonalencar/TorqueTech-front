import { GenericService } from "../genericService/genericService";

export class IVehicleService extends GenericService {}

export const VehicleService = new IVehicleService("/vehicle");
