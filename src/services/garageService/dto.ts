import { Address, User } from "@/types/authTypes";

export interface Garage {
  id: string;
  name: string;
  cnpj: string;
  owner: User;
  address: Address;
}
