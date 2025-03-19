import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { ResponseDTO } from "@/services/baseApi/interface";
import { Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";
import { Mechanic } from "@/services/mechanicService/dto";
import { MechanicService } from "@/services/mechanicService/service";
import { Vehicle } from "@/services/vehicleService/dto";
import { VehicleService } from "@/services/vehicleService/service";
import { CreateWorkRequestDTO } from "@/services/workService/dto";
import { formatLicensePlate } from "@/utils/formaters/format";
import { FormProps } from "antd";
import { Col, Form, Input, Row, DatePicker } from "antd";
import { useEffect, useState } from "react";

interface Props extends FormProps<CreateWorkRequestDTO> {
  children?: React.ReactNode;
}

export const CreateWorkForm = ({ children, ...rest }: Props) => {
  const [loading, setLoading] = useState(false);

  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchMechanics = async () => {
    setLoading(true);
    try {
      const { data } = await MechanicService.get();
      setMechanics(data);
    } catch (error) {
      console.error("fetchMechanics [CreateWorkForm]", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await CustomerService.get();
      setCustomers(data);
    } catch (error) {
      console.error("fetchMechanics [CreateWorkForm]", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async (customerId: string) => {
    setLoading(true);
    try {
      const { data } = await VehicleService.getAllByCustomer<
        ResponseDTO<Vehicle[]>
      >(customerId);
      setVehicles(data);
    } catch (error) {
      console.error("fetchMechanics [CreateWorkForm]", error);
    } finally {
      setLoading(false);
    }
  };

  const getVehicleName = (vehicle: Vehicle) => {
    return `${vehicle.vehicleType.brand} ${
      vehicle.vehicleType.model
    } - ${formatLicensePlate(vehicle.licensePlate)}`;
  };

  useEffect(() => {
    fetchMechanics();
    fetchCustomers();
  }, []);

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Form layout="vertical" {...rest}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Cliente"
              name="customerId"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <SelectSearchInput
                placeholder="Selecione o cliente"
                options={customers.map((customer) => ({
                  value: customer.id,
                  label: customer.profile.name,
                }))}
                onSelect={(customerId) => fetchVehicles(customerId as string)}
              />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Veículo"
                  name="vehicleId"
                  rules={[{ required: true, message: "Campo obrigatório!" }]}
                  dependencies={["customerId"]}
                >
                  <SelectSearchInput
                    placeholder="Selecione o veículo"
                    options={vehicles?.map((vehicle) => ({
                      value: vehicle.id,
                      label: getVehicleName(vehicle),
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mecanico" name="mechanicId">
                  <SelectSearchInput
                    placeholder="Selecione o mecanico"
                    options={mechanics.map((mechanic) => ({
                      value: mechanic.id,
                      label: mechanic?.user?.profile?.name,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input placeholder="Título do trabalho" />
            </Form.Item>
            <Form.Item
              label="Descrição"
              name="description"
              rules={[{ required: true, message: "Campo obrigatório!" }]}
            >
              <Input.TextArea placeholder="Descrição do trabalho" />
            </Form.Item>

            <>{children}</>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Início Previsto"
                  name="startAt"
                  rules={[{ required: true, message: "Campo obrigatório!" }]}
                >
                  <DatePicker
                    showTime
                    style={{ width: "100%" }}
                    format={"DD/MM/YYYY HH:mm"}
                    placeholder="Data de início"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Término Previsto" name="expectedAt">
                  <DatePicker
                    showTime
                    style={{ width: "100%" }}
                    format={"DD/MM/YYYY HH:mm"}
                    placeholder="Data de término"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Preço"
                  name="price"
                  rules={[{ required: true, message: "Campo obrigatório!" }]}
                >
                  <InputMoney placeholder="Preço" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Custo Total"
                  name="totalCost"
                  rules={[{ required: true, message: "Campo obrigatório!" }]}
                >
                  <InputMoney
                    placeholder="Custo total"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};
