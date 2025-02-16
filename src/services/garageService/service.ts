import { GenericService } from "../genericService/genericService";

export class IGarageService extends GenericService {}

export const GarageService = new IGarageService("/garage");
