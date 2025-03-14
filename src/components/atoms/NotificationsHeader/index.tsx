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
    >
      <Button type="text" size="small">
        <Badge count={0} size="small">
          <IoNotifications size={20} />
        </Badge>
      </Button>
    </Popover>
  );
};
