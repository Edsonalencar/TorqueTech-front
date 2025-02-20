import { GenericService } from "../genericService/genericService";

export class IVehicleTypeService extends GenericService {}

export const VehicleTypeService = new IVehicleTypeService("/vehicle-types");
