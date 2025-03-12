import { User } from "@/types/authTypes";
import { Garage } from "../garageService/dto";

export interface Mechanic {
  id: string;
  garage: Garage;
  user: User;
  createdAt: string;
}
