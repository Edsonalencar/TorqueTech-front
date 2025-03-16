import { Badge, Button, Flex, Popover } from "antd";
import { IoNotifications } from "react-icons/io5";

export const NotificationsHeader: React.FC = () => {
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
          <IoNotifications size={17} />
        </Badge>
      </Button>
    </Popover>
  );
};
