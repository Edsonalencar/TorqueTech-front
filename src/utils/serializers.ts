import { ItemCategory } from "@/services/itemStockService/dto";
import {
  TransactionCategoryIn,
  TransactionCategoryOut,
} from "@/services/stockTransactionService/dto";
import { UserStatus } from "@/types/authTypes";

export const parserDayToPt = (day: string) => {
  switch (day) {
    case "SUNDAY":
      return "Domingo";
    case "MONDAY":
      return "Segunda-feira";
    case "TUESDAY":
      return "Terça-feira";
    case "WEDNESDAY":
      return "Quarta-feira";
    case "THURSDAY":
      return "Quinta-feira";
    case "FRIDAY":
      return "Sexta-feira";
    case "SATURDAY":
      return "Sabádo";
  }
};

export const parserDayToInt = (day: string): number => {
  switch (day) {
    case "SUNDAY":
      return 1;
    case "MONDAY":
      return 2;
    case "TUESDAY":
      return 3;
    case "WEDNESDAY":
      return 4;
    case "THURSDAY":
      return 5;
    case "FRIDAY":
      return 6;
    case "SATURDAY":
      return 7;
    default:
      return -1;
  }
};

export const parseDay = (day: string) => {
  switch (day) {
    case "Dom":
      return "SUNDAY";
    case "Seg":
      return "MONDAY";
    case "Ter":
      return "TUESDAY";
    case "Qua":
      return "WEDNESDAY";
    case "Qui":
      return "THURSDAY";
    case "Sex":
      return "FRIDAY";
    case "Sáb":
      return "SATURDAY";
  }
};

export const userStatusSerialize = (value?: UserStatus) => {
  switch (value) {
    case UserStatus.ACTIVE:
      return "Ativo";
    case UserStatus.INACTIVE:
      return "Inativo";
    default:
      return "Ativo";
  }
};

export const transactionCategorySerialize = (
  value?: TransactionCategoryOut | TransactionCategoryIn
): string => {
  switch (value) {
    case TransactionCategoryOut.SALE:
      return "Venda de Itens";
    case TransactionCategoryOut.WORK_ORDER:
      return "Uso em Ordem de Serviço";
    case TransactionCategoryOut.DISPOSAL:
      return "Descarte de Itens";
    case TransactionCategoryOut.TRANSFER:
      return "Transferência Enviada";
    case TransactionCategoryIn.PURCHASE:
      return "Compra de Estoque";
    case TransactionCategoryIn.RETURN:
      return "Devolução ao Estoque";
    case TransactionCategoryIn.TRANSFER:
      return "Transferência Recebida";
    case TransactionCategoryIn.WARRANTY_REPLACEMENT:
      return "Substituição por Garantia";
    default:
      return "Desconhecido";
  }
};

export const itemCategorySerialize = (value?: ItemCategory): string => {
  switch (value) {
    case ItemCategory.ENGINE_PARTS:
      return "Peças do Motor";
    case ItemCategory.TRANSMISSION:
      return "Sistema de Transmissão";
    case ItemCategory.SUSPENSION:
      return "Suspensão e Direção";
    case ItemCategory.BRAKES:
      return "Sistema de Freios";
    case ItemCategory.ELECTRICAL:
      return "Elétrica e Eletrônicos";
    case ItemCategory.FILTERS:
      return "Filtros";
    case ItemCategory.LUBRICANTS:
      return "Óleos e Lubrificantes";
    case ItemCategory.EXHAUST_SYSTEM:
      return "Sistema de Escape";
    case ItemCategory.COOLING_SYSTEM:
      return "Sistema de Arrefecimento";
    case ItemCategory.TIRES_WHEELS:
      return "Pneus e Rodas";
    case ItemCategory.TOOLS:
      return "Ferramentas e Equipamentos";
    case ItemCategory.ACCESSORIES:
      return "Acessórios";
    case ItemCategory.BODY_PARTS:
      return "Carroceria e Estruturas";
    case ItemCategory.FUEL_SYSTEM:
      return "Sistema de Combustível";
    case ItemCategory.LIGHTING:
      return "Iluminação";
    case ItemCategory.AIR_CONDITIONING:
      return "Ar-condicionado";
    case ItemCategory.HYDRAULIC_SYSTEM:
      return "Sistema Hidráulico";
    case ItemCategory.TRACTOR_SPECIFIC:
      return "Peças para Tratores";
    case ItemCategory.TRUCK_SPECIFIC:
      return "Peças para Caminhões";
    case ItemCategory.MOTORCYCLE_SPECIFIC:
      return "Peças para Motos";
    case ItemCategory.HEAVY_EQUIPMENT:
      return "Peças para Máquinas Pesadas";
    case ItemCategory.ELECTRONIC_COMPONENTS:
      return "Componentes Eletrônicos";
    case ItemCategory.SAFETY_EQUIPMENT:
      return "Equipamentos de Segurança";
    case ItemCategory.WORKSHOP_SUPPLIES:
      return "Materiais de Consumo para Oficina";
    default:
      return "Desconhecido";
  }
};

export const workOrderStatusSerialize = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "Aguardando Início",
    IN_PROGRESS: "Em Andamento",
    WAITING_PARTS: "Aguardando Peças",
    ON_HOLD: "Pausado",
    COMPLETED: "Concluído",
    OVERDUE: "Atrasado",
  };

  return statusMap[status] || "Status desconhecido";
};
