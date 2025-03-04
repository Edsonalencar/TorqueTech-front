import { formatCurrency } from "@/utils/formaters/formatCurrency";
import { Flex } from "antd";
import { BoardCardType } from "./interfaces";

export const BoardCard: React.FC<BoardCardType> = ({
  description,
  title,
  icon,
  value,
}) => {
  return (
    <div className="p-3 rounded-lg" style={{ backgroundColor: "#fff" }}>
      <Flex align="center" justify="space-between">
        <Flex vertical className="text-gray-700" gap={2}>
          <h3 className=" text-sm font-semibold">{title}</h3>
          {!!description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
          {!!value && <p className="text-xs">{formatCurrency(value)}</p>}
        </Flex>
        <div>{icon}</div>
      </Flex>
    </div>
  );
};
