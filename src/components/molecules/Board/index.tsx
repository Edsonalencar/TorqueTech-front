import { BoardCardType } from "@/components/molecules/Board/BoardCard/interfaces";
import { BoardColumn } from "@/components/molecules/Board/BoardColumn";
import { BoardColumnType } from "@/components/molecules/Board/BoardColumn/interfaces";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Row } from "antd";
import { useState } from "react";

const initialList: BoardCardType[] = [
  {
    key: "troca_oleo_001",
    title: "Troca de Óleo",
    description:
      "Troca de óleo e filtro do motor para garantir melhor desempenho.",
    value: 250.0,
  },
  {
    key: "diag_eletrico_002",
    title: "Diagnóstico Elétrico",
    description:
      "Verificação completa do sistema elétrico do veículo para identificar falhas.",
    value: 150.0,
  },
  {
    key: "embreagem_003",
    title: "Substituição de Embreagem",
    description:
      "Troca do kit de embreagem completo para melhor dirigibilidade.",
    value: 1200.0,
  },
];

type Columns = Record<string, BoardColumnType>;

// Mapeamento dos status para colunas do Kanban
const initialColumns: Columns = {
  aguardando: {
    key: "aguardando",
    title: "Aguardando Início",
    items: [...initialList],
  },
  em_andamento: {
    key: "em_andamento",
    title: "Em Andamento",
    items: [],
  },
  pausado: {
    key: "pausado",
    title: "Pausado",
    items: [],
  },
  finalizado: {
    key: "finalizado",
    title: "Finalizado",
    items: [],
  },
  financeiro: {
    key: "financeiro",
    title: "Financeiro",
    items: [],
  },
  cancelado: {
    key: "cancelado",
    title: "Cancelado",
    items: [],
  },
};

export const Board: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialColumns);

  const moveItemBetweenColumns = (
    columns: Columns,
    sourceId: string,
    destId: string,
    sourceIndex: number,
    destIndex: number
  ): Columns => {
    const sourceColumn = columns[sourceId];
    const destinationColumn = columns[destId];

    // Clonamos as listas para evitar mutação direta
    const newSourceItems = [...sourceColumn.items];
    const newDestinationItems = [...destinationColumn.items];

    // Remove o item da lista de origem
    const [movedItem] = newSourceItems.splice(sourceIndex, 1);

    // Adiciona o item na nova posição da lista de destino
    newDestinationItems.splice(destIndex, 0, movedItem);

    // Retorna novo estado atualizado
    return {
      ...columns,
      [sourceId]: { ...sourceColumn, items: newSourceItems },
      [destId]: { ...destinationColumn, items: newDestinationItems },
    };
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // Se não houver destino, cancela a ação
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return; // Se não houve movimentação, retorna

    const updatedColumns = moveItemBetweenColumns(
      columns,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
    setColumns(updatedColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={[16, 16]} className="p-2 rounded-sm bg-gray-100">
        {Object.values(columns).map((col, index) => (
          <BoardColumn col={col} key={col.key} index={index} />
        ))}
      </Row>
    </DragDropContext>
  );
};
