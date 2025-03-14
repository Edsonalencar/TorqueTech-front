import { InputLicensePlate } from "@/components/atoms/Inputs/InputLicensePlate";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { CreateVehicleTypeModal } from "@/components/molecules/modais/CreateVehicleTypeModal";
import { AddressForm } from "@/components/organisms/AddressForm";
import { UserForm } from "@/components/organisms/UserForm";
import { CreateCustomerDTO } from "@/services/customerService/dto";
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
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMinusCircle } from "react-icons/fi";
import { ToBack } from "@/components/atoms/ToBack";
import { CreateVehicleDTO } from "@/services/vehicleService/dto";
import { validateFormIsEmpty } from "@/utils/validations";
import { Address } from "@/types/authTypes";

interface Props {}

export const CreateCustomerPage: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [profileForm] = Form.useForm<UserType>();
  const [addressForm] = Form.useForm<{ address: Address }>();
  const [vehiclesForm] = Form.useForm<{ vehicles: CreateVehicleDTO[] }>();

  const navegate = useNavigate();

  const [newVehicleTypeOpen, setNewVehicleTypeOpen] = useState<boolean>(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const baseColorOptions = vehicleColorOptions.map((brand) => ({
    value: brand.label,
  }));

  const [colorOptions, setColorOptions] =
    useState<{ value: string }[]>(baseColorOptions);

  const toList = () => {
    navegate("/app/customers");
  };

  const handleSearch = (value: string) => {
    if (!value) {
      setColorOptions(baseColorOptions);
      return;
    }

    const filteredOptions = BRANDS.filter((brand) =>
      brand.toLowerCase().includes(value.toLowerCase())
    ).map((brand) => ({ value: brand }));

    setColorOptions(filteredOptions);
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
    const profileData = await profileForm.validateFields();
    const addressData = await addressForm.validateFields();
    const vehiclesData = await vehiclesForm.validateFields();

    const formValue: CreateCustomerDTO = {
      ...profileData,
      ...vehiclesData,
      address: validateFormIsEmpty(addressData.address)
        ? addressData.address
        : undefined,
    };

    create(formValue);
  };

  useEffect(() => {
    fetchVehicleType();
  }, []);

  return (
    <>
      <LoadingContent isLoading={loading} />

      <Flex gap={20} vertical>
        <ToBack />
        <Card>
          <Flex gap={15} vertical className="mt-5">
            <Typography.Title level={5}>Dados do Cliente</Typography.Title>
            <UserForm form={profileForm} />

            <Typography.Title level={5}>Endereço</Typography.Title>
            <AddressForm form={addressForm} />

            <Form form={vehiclesForm} layout="vertical">
              <Typography.Title level={5}>Veiculos</Typography.Title>
              <Form.List name="vehicles">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Row gutter={[16, 16]}>
                        <Col span={24} md={{ span: 8 }}>
                          <Form.Item
                            label="Veículo"
                            name={[name, "vehicleTypeId"]}
                            key={key + "_vehicleTypeId"}
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
                        </Col>
                        <Col span={24} md={{ span: 8 }}>
                          <Form.Item
                            label="Placa"
                            name={[name, "licensePlate"]}
                            key={key + "_licensePlate"}
                            rules={[
                              { required: true, message: "Campo obrigatório!" },
                            ]}
                          >
                            <InputLicensePlate placeholder="Placa do veículo" />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={{ span: 6 }}>
                          <Form.Item
                            label="Cor"
                            name={[name, "color"]}
                            key={key + "_color"}
                            rules={[
                              { required: true, message: "Campo obrigatório!" },
                            ]}
                          >
                            <AutoComplete
                              style={{ width: "100%" }}
                              options={colorOptions}
                              onSearch={handleSearch}
                              placeholder="Cor do veículo"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={{ span: 2 }}>
                          <Flex
                            align="center"
                            justify="center"
                            className="h-full"
                          >
                            <Button
                              onClick={() => remove(name)}
                              block
                              size="small"
                              type="text"
                            >
                              <FiMinusCircle />
                            </Button>
                          </Flex>
                        </Col>
                      </Row>
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
      </Flex>

      <CreateVehicleTypeModal
        isOpen={!!newVehicleTypeOpen}
        onClose={() => setNewVehicleTypeOpen?.(false)}
        reload={fetchVehicleType}
      />
    </>
  );
};
