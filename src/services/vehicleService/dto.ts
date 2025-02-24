import { Customer } from "../customerService/dto";
import { VehicleType } from "../vehicleTypeService/dto";

export interface Vehicle {
  id: string;
  licensePlate: string;
  color: string;
  vehicleType: VehicleType;
  customer: Customer;
  createdAt?: string;
}

export interface CreateVehicleDTO {
  licensePlate: string; // A placa do veículo é obrigatória
  color: string; // A cor do veículo é obrigatória
  vehicleTypeId?: string; // Opcional, pois em Java UUID pode ser null
  customerId?: string;
}
