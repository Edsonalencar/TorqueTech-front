import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ToBack } from "@/components/atoms/ToBack";
import { ProfileWitchEmailDescription } from "@/components/molecules/Descriptions/ProfileWitchEmailDescription";
import { CreateMechanicModal } from "@/components/molecules/modais/CreateMechanicModal";
import { Button, Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { Mechanic } from "@/services/mechanicService/dto";
import { MechanicService } from "@/services/mechanicService/service";

export const ViewMechanicPage: React.FC = () => {
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resource, setResource] = useState<Mechanic>();
  const [canEdit, setCanEdit] = useState(false);

  const { id } = useParams();

  const fetchResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      const { data } = await MechanicService.getById(resourceId);
      setResource(data);
    } catch (error) {
      console.error("fetchResource [ViewMechanicPage]", error);
    } finally {
      setResourceLoading(false);
    }
  };

  const reload = async () => {
    if (!id) return;
    await fetchResource(id);
  };

  useEffect(() => {
    if (id) fetchResource(id);
  }, [id]);

  return (
    <>
      <LoadingContent isLoading={resourceLoading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <ProfileWitchEmailDescription
            tittle={
              <Flex gap={16} justify="space-between">
                <Typography.Title level={5}>Mecânico</Typography.Title>
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
              ...resource?.user?.profile,
              owner: resource?.org,
              email: resource?.user?.auth?.username,
              status: resource?.user?.status,
            }}
          />
        </Card>
      </Flex>

      <CreateMechanicModal
        isOpen={canEdit}
        onClose={() => setCanEdit(false)}
        initialData={resource}
        reload={reload}
      />
    </>
  );
};
