import { RcFile } from "antd/es/upload";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { Address } from "@/types/authTypes";
import { ItemCategory } from "@/services/itemStockService/dto";

export async function copyText(link?: string) {
  if (!link) return;

  try {
    await navigator.clipboard.writeText(link);
    toast.success("Link copiado com sucesso!");
  } catch (err) {
    toast.success("Falha ao copiar o link!");
  }
}

export const getContrastColor = (hexColor?: string) => {
  if (!hexColor) return "black";
  hexColor = hexColor.replace("#", "");

  // Converte a cor para componentes RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calcula o brilho usando a fórmula de luminância relativa
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Retorna preto para cores claras e branco para cores escuras
  return brightness > 128 ? "black" : "white";
};

export const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function calculateAge(birthDate?: string) {
  if (!birthDate) return undefined;

  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth() - birthDateObj.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age + " anos";
}

export const formatterAddres = (address?: Address) => {
  if (!address) return "Não informado";
  return `${address?.city}/${address?.state}`;
};

export function getNextRepetitionDate(
  repetitionType: string,
  repetitionNumber: number,
  startDate: Date = new Date() // opcionalmente, você pode fornecer uma data de início
): Date {
  let nextDate = new Date(startDate); // Copia a data de início

  if (repetitionNumber == 0) return nextDate;

  switch (repetitionType) {
    case "SINGLE":
      return nextDate; // Retorna a data de início sem alteração

    case "WEEKLY":
      nextDate.setDate(nextDate.getDate() + 7 * repetitionNumber);
      break;

    case "BIWEEKLY":
      nextDate.setDate(nextDate.getDate() + 14 * repetitionNumber);
      break;

    case "MONTHLY":
      nextDate.setMonth(nextDate.getMonth() + repetitionNumber);
      break;

    default:
      throw new Error("Tipo de repetição inválido");
  }

  return nextDate;
}

export const convertBoleanToString = (value?: boolean) => {
  return value ? "Sim" : "Não";
};

export const disablePastDates = (current: dayjs.Dayjs) => {
  return current && current < dayjs().startOf("day");
};

export const convertRcFileToFile = (rcFile: RcFile): File => {
  return new File([rcFile], rcFile.name, { type: rcFile.type });
};

export const booleanSelectOptions = [
  { label: "Sim", value: true },
  { label: "Não", value: false },
];

export const stateOptions = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const vehicleCategoryOptions = [
  { value: "PASSENGER_CAR", label: "Carro de Passeio" },
  { value: "ELECTRIC_CAR", label: "Carro Elétrico" },
  { value: "PICKUP_TRUCK", label: "Caminhonete" },
  { value: "VAN", label: "Van" },
  { value: "LIGHT_TRUCK", label: "Caminhão Leve" },
  { value: "HEAVY_TRUCK", label: "Caminhão Pesado" },
  { value: "BUS", label: "Ônibus" },
  { value: "MOTORCYCLE", label: "Motocicleta" },
  { value: "SCOOTER", label: "Scooter" },
  { value: "ATV", label: "Veículo Off-Road (ATV)" },
  { value: "UTV", label: "Veículo Utilitário (UTV)" },
  { value: "AGRICULTURAL", label: "Veículo Agrícola" },
  { value: "CONSTRUCTION", label: "Veículo de Construção" },
  { value: "EMERGENCY", label: "Veículo de Emergência" },
  { value: "MILITARY", label: "Veículo Militar" },
];

export const vehicleColorOptions = [
  { value: "WHITE", label: "Branco" },
  { value: "BLACK", label: "Preto" },
  { value: "SILVER", label: "Prata" },
  { value: "GRAY", label: "Cinza" },
  { value: "RED", label: "Vermelho" },
  { value: "BLUE", label: "Azul" },
  { value: "GREEN", label: "Verde" },
  { value: "YELLOW", label: "Amarelo" },
  { value: "ORANGE", label: "Laranja" },
  { value: "BROWN", label: "Marrom" },
  { value: "BEIGE", label: "Bege" },
  { value: "PURPLE", label: "Roxo" },
  { value: "PINK", label: "Rosa" },
  { value: "GOLD", label: "Dourado" },
  { value: "CHAMPAGNE", label: "Champanhe" },
  { value: "BORDEAUX", label: "Bordô" },
  { value: "TURQUOISE", label: "Turquesa" },
];

export const workStatusOptions = [
  { value: "PENDING", label: "Aguardando Início" },
  { value: "IN_PROGRESS", label: "Em Andamento" },
  { value: "WAITING_PARTS", label: "Aguardando Peças" },
  { value: "ON_HOLD", label: "Pausado" },
  { value: "COMPLETED", label: "Concluído" },
  { value: "CANCELED", label: "Cancelado" },
  { value: "DELIVERED", label: "Entregue ao Cliente" },
  { value: "INVOICED", label: "Faturado" },
  { value: "PAID", label: "Pago" },
];

export const workOrderStatusOptions = [
  { value: "PENDING", label: "Aguardando Início" },
  { value: "IN_PROGRESS", label: "Em Andamento" },
  { value: "WAITING_PARTS", label: "Aguardando Peças" },
  { value: "ON_HOLD", label: "Pausado" },
  { value: "COMPLETED", label: "Concluído" },
  { value: "OVERDUE", label: "Atrasado" },
];

export const transactionCategoryInOptions = [
  { value: "PURCHASE", label: "Compra de Estoque" },
  { value: "RETURN", label: "Devolução ao Estoque" },
  { value: "TRANSFER", label: "Transferência Recebida" },
  { value: "WARRANTY_REPLACEMENT", label: "Substituição por Garantia" },
];

export const transactionCategoryOutOptions = [
  { value: "SALE", label: "Venda de Itens" },
  { value: "WORK_ORDER", label: "Uso em Ordem de Serviço" },
  { value: "DISPOSAL", label: "Descarte de Itens" },
  { value: "TRANSFER", label: "Transferência Enviada" },
];

export const itemCategoryOptions = [
  { value: ItemCategory.ENGINE_PARTS, label: "Peças do Motor" },
  { value: ItemCategory.TRANSMISSION, label: "Sistema de Transmissão" },
  { value: ItemCategory.SUSPENSION, label: "Suspensão e Direção" },
  { value: ItemCategory.BRAKES, label: "Sistema de Freios" },
  { value: ItemCategory.ELECTRICAL, label: "Elétrica e Eletrônicos" },
  { value: ItemCategory.FILTERS, label: "Filtros" },
  { value: ItemCategory.LUBRICANTS, label: "Óleos e Lubrificantes" },
  { value: ItemCategory.EXHAUST_SYSTEM, label: "Sistema de Escape" },
  { value: ItemCategory.COOLING_SYSTEM, label: "Sistema de Arrefecimento" },
  { value: ItemCategory.TIRES_WHEELS, label: "Pneus e Rodas" },
  { value: ItemCategory.TOOLS, label: "Ferramentas e Equipamentos" },
  { value: ItemCategory.ACCESSORIES, label: "Acessórios" },
  { value: ItemCategory.BODY_PARTS, label: "Carroceria e Estruturas" },
  { value: ItemCategory.FUEL_SYSTEM, label: "Sistema de Combustível" },
  { value: ItemCategory.LIGHTING, label: "Iluminação" },
  { value: ItemCategory.AIR_CONDITIONING, label: "Ar-condicionado" },
  { value: ItemCategory.HYDRAULIC_SYSTEM, label: "Sistema Hidráulico" },
  { value: ItemCategory.TRACTOR_SPECIFIC, label: "Peças para Tratores" },
  { value: ItemCategory.TRUCK_SPECIFIC, label: "Peças para Caminhões" },
  { value: ItemCategory.MOTORCYCLE_SPECIFIC, label: "Peças para Motos" },
  { value: ItemCategory.HEAVY_EQUIPMENT, label: "Peças para Máquinas Pesadas" },
  {
    value: ItemCategory.ELECTRONIC_COMPONENTS,
    label: "Componentes Eletrônicos",
  },
  { value: ItemCategory.SAFETY_EQUIPMENT, label: "Equipamentos de Segurança" },
  {
    value: ItemCategory.WORKSHOP_SUPPLIES,
    label: "Materiais de Consumo para Oficina",
  },
];
