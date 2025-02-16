import { User } from "@/types/authTypes";

export interface Manager {
  id?: string;
  user?: User;
  org?: User;
  createdAt?: string;
}