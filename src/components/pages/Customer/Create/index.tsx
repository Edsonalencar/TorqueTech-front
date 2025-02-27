import { InputLicensePlate } from "@/components/atoms/Inputs/InputLicensePlate";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { CreateVehicleTypeModal } from "@/components/molecules/modais/CreateVehicleTypeModal";
import { AddressForm } from "@/components/organisms/AddressForm";
import { UserForm } from "@/components/organisms/UserForm";
import { CreateCustomerDTO, Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";
import { VehicleType } from "@/services/vehicleTypeService/dto";
import { VehicleTypeService } from "@/services/vehicleTypeService/service";
import { UserType } from "@/types";
import { BRANDS } from "@/utils/brandCars";
import { formatVehicleType } from "@/utils/formaters";
import { cleanMask } from "@/utils/formaters/format";
import { vehicleColorOptions } from "@/utils/utils";
import {
  AutoComplete,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Row,
  Space,
  Typography,
} from "antd";
import { Address } from "cluster";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMinusCircle } from "react-icons/fi";
import { ToBack } from "@/components/atoms/ToBack";
import { CreateVehicleDTO } from "@/services/vehicleService/dto";

interface Props {}

export const CreateCustomerPage: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [profileForm] = Form.useForm<UserType>();
  const [addressForm] = Form.useForm<Address>();
  const [vehiclesForm] = Form.useForm<{ vehicles: CreateVehicleDTO }>();

  const navegate = useNavigate();

  const [newVehicleTypeOpen, setNewVehicleTypeOpen] = useState<boolean>(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const brandOptions = vehicleColorOptions.map((brand) => ({
    value: brand.label,
  }));

  const [options, setOptions] = useState<{ value: string }[]>(brandOptions);

  const toList = () => {
    navegate("/app/customers");
  };

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

  const fetchVehicleType = async () => {
    setLoading(true);
    try {
      const { data } = await VehicleTypeService.get();
      setVehicleTypes(data);
    } catch (error) {
      console.error("fetchVehicleType", error);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: CreateCustomerDTO) => {
    const formData = {
      ...data,
      document: cleanMask(data.document),
    };

    try {
      setLoading(true);
      await CustomerService.create(formData);
      toList();
    } catch (error) {
      console.error("create Jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const profile = await profileForm.validateFields();
    const address = await addressForm.validateFields();
    const vehicles = await vehiclesForm.validateFields();

    console.log("profile", profile);
    console.log("address", address);
    console.log("vehicles", vehicles);

    // if (uuid) update(uuid, formValue);
    // else create(formValue);
  };

  useEffect(() => {
    fetchVehicleType();
  }, []);

  return (
    <>
      <LoadingContent isLoading={loading} />

      <ToBack />
      <Card>
        <Flex gap={15} vertical className="mt-5">
          <Typography.Title level={5}>Dados do Cliente</Typography.Title>
          <UserForm form={profileForm} />

          <Typography.Title level={5}>Endereço</Typography.Title>
          <AddressForm form={addressForm} />

          <Form layout="vertical">
            <Typography.Title level={5}>Veiculos</Typography.Title>
            <Form.List name="vehicles">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        label="Veículo"
                        name={"vehicleType"}
                        key={"vehicleType"}
                        rules={[
                          { required: true, message: "Campo obrigatório!" },
                        ]}
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
                      <Form.Item
                        label="Placa"
                        name={"licensePlate"}
                        key={"licensePlate"}
                        rules={[
                          { required: true, message: "Campo obrigatório!" },
                        ]}
                      >
                        <InputLicensePlate placeholder="Placa do veículo" />
                      </Form.Item>
                      <Form.Item
                        label="Cor"
                        name={"color"}
                        key={"color"}
                        rules={[
                          { required: true, message: "Campo obrigatório!" },
                        ]}
                      >
                        <AutoComplete
                          style={{ width: "100%" }}
                          options={options}
                          onSearch={handleSearch}
                          placeholder="Cor do veículo"
                        />
                      </Form.Item>

                      <Button onClick={() => remove(name)} block type="text">
                        <FiMinusCircle />
                      </Button>
                    </Space>
                  ))}

                  <Form.Item>
                    <Button type="primary" onClick={() => add()} block>
                      Adicionar Veículo
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>

          <Row gutter={[16, 16]} justify="end">
            <Col span={24} md={6} lg={3}>
              <Button onClick={toList} className=" w-full">
                Cancelar
              </Button>
            </Col>
            <Col span={24} md={6} lg={3}>
              <Button type="primary" onClick={submit} className=" w-full">
                Salvar
              </Button>
            </Col>
          </Row>
        </Flex>
      </Card>

      <CreateVehicleTypeModal
        isOpen={!!newVehicleTypeOpen}
        onClose={() => setNewVehicleTypeOpen?.(false)}
        reload={fetchVehicleType}
      />
    </>
  );
};
