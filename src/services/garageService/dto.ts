import { Address, User } from "@/types/authTypes";

export interface CreateGarageDTO {
  name: string;
  cnpj: string;

  username?: string;
  password?: string;
  ownerName?: string;
  document?: string;
  phone?: string;
  birthDate?: string | Date;
  role?: RoleType;

  address?: Address;
}

export interface Garage {
  id: string;
  name: string;
  cnpj: string;
  owner: User;
  address: Address;
}

export enum RoleType {
  ROLE_USER = "USER",
  ROLE_MANAGER = "MANAGER",
  ROLE_ADMIN = "ADMIN",
  ROLE_SUPER_ADMIN = "SUPER_ADMIN",
}
