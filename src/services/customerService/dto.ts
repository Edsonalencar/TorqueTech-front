import { Profile, User, UserStatus } from "@/types/authTypes";
import { Vehicle } from "../vehicleService/dto";
import { Garage } from "../garageService/dto";

export interface Customer {
  id: string;
  status: UserStatus;
  profile: Profile;
  vehicles: Vehicle[];
  garage: Garage;
  owner: User;
}
