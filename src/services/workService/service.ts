import { GenericService } from "../genericService/genericService";

export class IWorkService extends GenericService {}

export const WorkService = new IWorkService("/work");
