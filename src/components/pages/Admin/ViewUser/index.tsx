import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { ProfileWitchEmailDescription } from "@/components/molecules/Descriptions/ProfileWitchEmailDescription";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddressDescription } from "@/components/molecules/Descriptions/AddressDescription";
import { User } from "@/types/authTypes";
import { UserService } from "@/services/userService/service";
import { CreateUserModal } from "@/components/molecules/modais/CreateUserModal";
import { AiFillEdit } from "react-icons/ai";

export const AdminViewUserPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<User>();
  const [canEdit, setCanEdit] = useState(false);

  const { uuid } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await UserService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [AdminViewUserPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const reload = async () => {
    if (!uuid) return;
    await fetchResource(uuid);
  };

  useEffect(() => {
    if (uuid) fetchResource(uuid);
  }, [uuid]);

  if (!resource) return <LoadingContent isLoading />;

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <Flex gap={20} vertical>
            <ProfileWitchEmailDescription
              title={
                <Flex gap={16} justify="space-between">
                  <Typography.Title level={5}>Usuário</Typography.Title>
                  <Button
                    onClick={() => setCanEdit(true)}
                    className="flex items-center gap-1"
                    type="text"
                  >
                    <AiFillEdit />
                    Editar
                  </Button>
                </Flex>
              }
              data={{
                ...resource?.profile,
                email: resource?.auth?.username,
                status: resource?.status,
              }}
            />

            {resource?.profile?.address && (
              <AddressDescription address={resource?.profile?.address} />
            )}
          </Flex>
        </Card>
      </Flex>

      <CreateUserModal
        isOpen={canEdit}
        onClose={() => setCanEdit(false)}
        initialData={resource}
        reload={reload}
      />
    </>
  );
};
