import { BoardCardType } from "../BoardCard/interfaces";

export interface BoardColumnType {
  key: string;
  title: string;
  items: BoardCardType[] | [];
}
