import { GenericService } from "../genericService/genericService";

export class IWorkOrderService extends GenericService {}

export const WorkOrderService = new IWorkOrderService("/work-order");
