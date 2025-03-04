import { Address, UserStatus } from "@/types/authTypes";

export interface CreateOrUpdateUserDTO {
  name?: string;
  username?: string;
  document?: string;
  phone?: string;
  password?: string;
  status?: UserStatus;
  birthDate?: string;
  address?: Address;
}
