import { InputProductCode } from "@/components/atoms/Inputs/InputCep copy";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { CreateItemStockRequest } from "@/services/itemStockService/dto";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import { formatVehicleType } from "@/utils/formaters";
import { itemCategoryOptions } from "@/utils/utils";
import { FormProps } from "antd";
import { Form, Input } from "antd";

interface Props extends FormProps<CreateItemStockRequest> {
  vehicleTypes?: VehicleType[];
  onAddVhiclType?: () => void;
}

export const ItemStockForm = ({
  onAddVhiclType,
  vehicleTypes,
  ...rest
}: Props) => {
  return (
    <>
      <Form layout="vertical" {...rest}>
        <Form.Item
          label="Nome do Item"
          name={"name"}
          key={"name"}
          id="name"
          rules={[{ required: true, message: "Campo obrigatório!" }]}
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
            allowClear
          />
        </Form.Item>

        <Form.Item label="Veículo" name={"vehicleTypeId"} key={"vehicleTypeId"}>
          <SelectSearchInput
            placeholder="Selecione a categoria do veículo"
            options={vehicleTypes?.map((vehicleType) => ({
              value: vehicleType.id,
              label: formatVehicleType(vehicleType),
            }))}
            onAdd={() => onAddVhiclType?.()}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Código"
          name={"code"}
          key={"code"}
          id="code"
          rules={[{ required: true, message: "Campo obrigatório!" }]}
        >
          <InputProductCode placeholder="AAA-XXXX" />
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
