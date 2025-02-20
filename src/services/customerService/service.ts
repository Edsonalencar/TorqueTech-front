import { GenericService } from "../genericService/genericService";

export class ICustomerService extends GenericService {}

export const CustomerService = new ICustomerService("/customers");
