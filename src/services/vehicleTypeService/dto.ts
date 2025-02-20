export interface VehicleType {
  id: string;
  model: string;
  brand: string;
  year: number;
  createdAt?: string;
}

export interface CreateVehicleTypeDTO {
  model: string;
  brand: string;
  year: number;
}
