import { Address, Profile, User, UserStatus } from "@/types/authTypes";
import { CreateVehicleDTO, Vehicle } from "../vehicleService/dto";
import { Garage } from "../garageService/dto";

export interface Customer {
  id: string;
  email: string;
  status: UserStatus;
  profile: Profile;
  vehicles: Vehicle[];
  garage: Garage;
  owner: User;
  createdAt?: string;
}

export interface CreateCustomerDTO {
  status?: UserStatus;
  name?: string;
  document?: string;
  phone?: string;
  birthDate?: string;
  address?: Address;
  vehicles?: CreateVehicleDTO[];
}
