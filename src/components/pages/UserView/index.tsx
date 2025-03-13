import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { ProfileWitchEmailDescription } from "@/components/molecules/Descriptions/ProfileWitchEmailDescription";
import { Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "@/types/authTypes";
import { UserService } from "@/services/userService/service";

export const UserView: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<User>();

  const { uuid } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await UserService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [UserView]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  useEffect(() => {
    if (uuid) fetchResource(uuid);
  }, [uuid]);

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <ProfileWitchEmailDescription
            title={
              <Flex gap={16} justify="space-between">
                <Typography.Title level={5}>Usuário</Typography.Title>
              </Flex>
            }
            data={{
              ...resource,
              ...resource?.profile,
              email: resource?.auth?.username,
            }}
          />
        </Card>
      </Flex>
    </>
  );
};
