import { ActiveStatus } from "@/types/authTypes";
import { VehicleType } from "../vehicleTypeService/dto";

export enum ItemCategory {
  ENGINE_PARTS = "ENGINE_PARTS", // Peças do motor
  TRANSMISSION = "TRANSMISSION", // Sistema de transmissão
  SUSPENSION = "SUSPENSION", // Suspensão e direção
  BRAKES = "BRAKES", // Sistema de freios
  ELECTRICAL = "ELECTRICAL", // Elétrica e eletrônicos
  FILTERS = "FILTERS", // Filtros
  LUBRICANTS = "LUBRICANTS", // Óleos e lubrificantes
  EXHAUST_SYSTEM = "EXHAUST_SYSTEM", // Sistema de escape
  COOLING_SYSTEM = "COOLING_SYSTEM", // Sistema de arrefecimento
  TIRES_WHEELS = "TIRES_WHEELS", // Pneus e rodas
  TOOLS = "TOOLS", // Ferramentas e equipamentos
  ACCESSORIES = "ACCESSORIES", // Acessórios
  BODY_PARTS = "BODY_PARTS", // Carroceria e estruturas
  FUEL_SYSTEM = "FUEL_SYSTEM", // Sistema de combustível
  LIGHTING = "LIGHTING", // Iluminação
  AIR_CONDITIONING = "AIR_CONDITIONING", // Ar-condicionado
  HYDRAULIC_SYSTEM = "HYDRAULIC_SYSTEM", // Sistema hidráulico
  TRACTOR_SPECIFIC = "TRACTOR_SPECIFIC", // Peças para tratores
  TRUCK_SPECIFIC = "TRUCK_SPECIFIC", // Peças para caminhões
  MOTORCYCLE_SPECIFIC = "MOTORCYCLE_SPECIFIC", // Peças para motos
  HEAVY_EQUIPMENT = "HEAVY_EQUIPMENT", // Peças para máquinas pesadas
  ELECTRONIC_COMPONENTS = "ELECTRONIC_COMPONENTS", // Componentes eletrônicos
  SAFETY_EQUIPMENT = "SAFETY_EQUIPMENT", // Equipamentos de segurança
  WORKSHOP_SUPPLIES = "WORKSHOP_SUPPLIES", // Materiais de consumo para oficina
}

export interface CreateItemStockRequest {
  name: string;
  description?: string;
  category?: ItemCategory;
  vehicleTypeId: string;
  code: string;
}

export interface ItemStock {
  id: string;
  name: string;
  description?: string;
  status: ActiveStatus;
  category?: ItemCategory;
  garageId: string;
  vehicleType?: VehicleType;
  code: string;
  createdAt: string;
}
