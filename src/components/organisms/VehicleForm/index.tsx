import { InputLicensePlate } from "@/components/atoms/Inputs/InputCpf";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { CreateVehicleTypeModal } from "@/components/molecules/modais/CreateVehicleTypeModal";
import { CreateVehicleDTO } from "@/services/vehicleService/dto";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import { VehicleTypeService } from "@/services/vehicleTypeService/service";
import { BRANDS } from "@/utils/brandCars";
import { formatVehicleType } from "@/utils/formaters";
import { vehicleColorOptions } from "@/utils/utils";
import { AutoComplete, FormProps } from "antd";
import { Col, Form, Row } from "antd";
import { useEffect, useState } from "react";

interface Props extends FormProps<CreateVehicleDTO> {
  newVehicleTypeOpen?: boolean;
  setNewVehicleTypeOpen?: (value: boolean) => void;
}

export const VehicleForm = ({
  newVehicleTypeOpen,
  setNewVehicleTypeOpen,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const brandOptions = vehicleColorOptions.map((brand) => ({
    value: brand.label,
  }));

  const [options, setOptions] = useState<{ value: string }[]>(brandOptions);

  const handleSearch = (value: string) => {
    if (!value) {
      setOptions(brandOptions);
      return;
    }

    const filteredOptions = BRANDS.filter((brand) =>
      brand.toLowerCase().includes(value.toLowerCase())
    ).map((brand) => ({ value: brand }));

    setOptions(filteredOptions);
  };

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
          label="Veículo"
          name={"vehicleType"}
          key={"vehicleType"}
          rules={[{ required: true, message: "Campo obrigatório!" }]}
        >
          <SelectSearchInput
            placeholder="Selecione a categoria do veículo"
            options={vehicleTypes.map((vehicleType) => ({
              value: vehicleType.id,
              label: formatVehicleType(vehicleType),
            }))}
            onAdd={() => setNewVehicleTypeOpen?.(true)}
          />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Form.Item
              label="Placa"
              name={"licensePlate"}
              key={"licensePlate"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <InputLicensePlate placeholder="Placa do veículo" />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="Cor"
              name={"color"}
              key={"color"}
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <AutoComplete
                style={{ width: "100%" }}
                options={options}
                onSearch={handleSearch}
                placeholder="Cor do veículo"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <CreateVehicleTypeModal
        isOpen={!!newVehicleTypeOpen}
        onClose={() => setNewVehicleTypeOpen?.(false)}
        reload={fetchResource}
      />
    </>
  );
};
