import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { CreateLocalStockRequest } from "@/services/localStockService/dto";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import { VehicleTypeService } from "@/services/vehicleTypeService/service";
import { formatVehicleType } from "@/utils/formaters";
import { itemCategoryOptions } from "@/utils/utils";
import { FormProps } from "antd";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";

interface Props extends FormProps<CreateLocalStockRequest> {
  onAddVhiclType?: () => void;
}

export const ItemStockForm = ({ onAddVhiclType, ...rest }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const fetchResource = async () => {
    setLoading(true);
    try {
      const { data } = await VehicleTypeService.get();
      setVehicleTypes(data);
    } catch (error) {
      console.error("fetchResource", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResource();
  }, []);

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Form layout="vertical" {...rest}>
        <Form.Item
          label="Nome do Item"
          name={"name"}
          key={"name"}
          id="name"
          rules={[
            {
              required: true,
              message: "Campo obrigatório!",
            },
          ]}
        >
          <Input placeholder="Digite o nome do item de estoque" />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name={"category"}
          key={"category"}
          id="category"
        >
          <SelectSearchInput
            placeholder="Selecione a categoria"
            options={itemCategoryOptions}
          />
        </Form.Item>

        <Form.Item
          label="Veículo"
          name={"vehicleTypeId"}
          key={"vehicleTypeId"}
          rules={[{ required: true, message: "Campo obrigatório!" }]}
        >
          <SelectSearchInput
            placeholder="Selecione a categoria do veículo"
            options={vehicleTypes.map((vehicleType) => ({
              value: vehicleType.id,
              label: formatVehicleType(vehicleType),
            }))}
            onAdd={() => onAddVhiclType?.()}
          />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name={"description"}
          key={"description"}
          id="description"
        >
          <Input.TextArea
            placeholder="Digite uma descrição (opcional)"
            rows={4}
          />
        </Form.Item>
      </Form>
    </>
  );
};
