import { User } from "@/types/authTypes";

export interface Mechanic {
  id?: string;
  user?: User;
  org?: User;
  createdAt?: string;
}