import { Button, Flex, Popover, Tooltip } from "antd";
import { BsPlusCircleFill } from "react-icons/bs";

export const AddHeader: React.FC = () => {
  return (
    <Tooltip title="Novo">
      <Popover
        content={
          <Flex justify="center" align="center" vertical className="w-52 p-2">
            <div className="text-xs">Nenhuma notificação</div>
          </Flex>
        }
        placement="bottomLeft"
        trigger={["click"]}
      >
        <Button
          className=" size-8 rounded-full"
          icon={<BsPlusCircleFill className="text-primary" size={17} />}
          type="text"
        />
      </Popover>
    </Tooltip>
  );
};
