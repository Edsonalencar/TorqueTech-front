import { User } from "@/types/authTypes";
import { Dayjs } from "dayjs";

export interface VehicleType {
  id: string;
  model: string;
  brand: string;
  year: number;
  owner: User;
  createdAt?: string;
}

export interface CreateVehicleTypeDTO {
  model: string;
  brand: string;
  year: string | Dayjs;
  category: VehicleTypeCategory;
}

export enum VehicleTypeCategory {
  // Veículos de passeio
  PASSENGER_CAR = "PASSENGER_CAR", // Carros de passeio (Hatch, Sedan, SUV, etc.)
  ELECTRIC_CAR = "ELECTRIC_CAR", // Veículos elétricos e híbridos
  PICKUP_TRUCK = "PICKUP_TRUCK", // Caminhonetes e picapes
  VAN = "VAN", // Vans e furgões

  // Veículos comerciais e pesados
  LIGHT_TRUCK = "LIGHT_TRUCK", // Caminhões leves
  HEAVY_TRUCK = "HEAVY_TRUCK", // Caminhões pesados e carretas
  BUS = "BUS", // Ônibus e micro-ônibus

  // Motocicletas e similares
  MOTORCYCLE = "MOTORCYCLE", // Motocicletas
  SCOOTER = "SCOOTER", // Scooters e ciclomotores
  ATV = "ATV", // Quadriciclos
  UTV = "UTV", // Veículos utilitários todo-terreno

  // Veículos agrícolas e especiais
  AGRICULTURAL = "AGRICULTURAL", // Veículos agrícolas (tratores, colheitadeiras, etc.)
  CONSTRUCTION = "CONSTRUCTION", // Máquinas de construção (retroescavadeiras, etc.)
  MARINE = "MARINE", // Veículos náuticos (barcos, lanchas, jet skis)

  // Veículos de uso específico
  EMERGENCY = "EMERGENCY", // Veículos de emergência (ambulâncias, viaturas)
  MILITARY = "MILITARY", // Veículos militares
}
