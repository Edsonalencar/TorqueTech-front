import { ItemStock } from "@/services/itemStockService/dto";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import dayjs, { Dayjs } from "dayjs";

export const characterformatterForRequest = (value: string) => {
  return value.replace(/[\(\)\-\s\.]/g, "");
};

export const toFirstUppercase = (value?: string) => {
  if (!value || value.length === 0) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatDateIso = (date?: Dayjs | Date) => {
  return dayjs(date).format("YYYYMMDD");
};

export const formatVehicleType = (vehicle: VehicleType) => {
  return `${vehicle.brand} ${vehicle.model}`;
};

export const formatItemStock = (item: ItemStock) => {
  const base = `${item.code} ${item.name}`;
  const vehicle = item.vehicleType
    ? ` - ${formatVehicleType(item.vehicleType)}`
    : "";

  return base + vehicle;
};
