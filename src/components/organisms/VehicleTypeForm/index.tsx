import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { CreateVehicleTypeDTO } from "@/services/vehicleTypeService/dto";
import { BRANDS } from "@/utils/brandCars";
import { vehicleCategoryOptions } from "@/utils/utils";
import { AutoComplete, DatePicker, FormProps, Select } from "antd";
import { Col, Form, Input, Row } from "antd";
import { useState } from "react";

interface Props extends FormProps<CreateVehicleTypeDTO> {}

export const VehicleTypeForm = ({ ...rest }: Props) => {
  const brandOptions = BRANDS.map((brand) => ({ value: brand }));

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

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item
        label="Modelo"
        name={"model"}
        key={"model"}
        rules={[{ required: true, message: "Campo obrigatório!" }]}
      >
        <Input placeholder="Modelo do veículo" />
      </Form.Item>

      <Form.Item
        label="Categoria"
        name={"category"}
        key={"category"}
        rules={[{ required: true, message: "Campo obrigatório!" }]}
      >
        <SelectSearchInput
          placeholder="Selecione a categoria do veículo"
          options={vehicleCategoryOptions}
        />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Form.Item
            label="Marca"
            name={"brand"}
            key={"brand"}
            rules={[{ required: true, message: "Campo obrigatório!" }]}
          >
            <AutoComplete
              style={{ width: "100%" }}
              options={options}
              onSearch={handleSearch}
              placeholder="Marca do veículo"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            label="Ano"
            name={"year"}
            key={"year"}
            rules={[{ required: true, message: "Campo obrigatório!" }]}
          >
            <DatePicker picker="year" placeholder="Ano do veículo" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
