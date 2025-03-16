import { Badge, Button, Flex, Popover } from "antd";
import { BsGear } from "react-icons/bs";

export const ConfigHeader: React.FC = () => {
  return (
    <Popover
      content={
        <Flex justify="center" align="center" vertical className="w-52 p-2">
          <div className="text-xs">Nenhuma notificação</div>
        </Flex>
      }
      placement="bottomLeft"
      trigger={["click"]}
    >
      <Button type="text" className=" size-8 rounded-full">
        <Badge count={0} size="small">
          <BsGear size={17} />
        </Badge>
      </Button>
    </Popover>
  );
};
