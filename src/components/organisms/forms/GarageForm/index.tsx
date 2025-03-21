import { InputCnpj } from "@/components/atoms/Inputs/InputCnpj";
import { InputPhone } from "@/components/atoms/Inputs/InputPhone";
import { CreateGarageDTO } from "@/services/garageService/dto";
import { Col, DatePicker, Form, FormProps, Input, Row } from "antd";

interface Props extends FormProps<CreateGarageDTO> {
  requiredPassword?: boolean;
}

export const GarageForm = ({ requiredPassword = true, ...rest }: Props) => {
  return (
    <Form layout="vertical" {...rest}>
      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Nome da Garagem"
            name={"name"}
            key={"name"}
            id="name"
            rules={[{ required: true, message: "Campo obrigatório!" }]}
          >
            <Input placeholder="Nome da garagem" />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="CNPJ"
            name={"cnpj"}
            key={"cnpj"}
            id="cnpj"
            rules={[{ required: true, message: "Campo obrigatório!" }]}
          >
            <InputCnpj placeholder="CNPJ" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Nome do Proprietário"
            name={"ownerName"}
            key={"ownerName"}
            id="ownerName"
            rules={[{ required: true, message: "Campo obrigatório!" }]}
          >
            <Input placeholder="Nome do proprietário" />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Documento"
            name={"document"}
            key={"document"}
            id="document"
          >
            <InputCnpj placeholder="000.000.000-00" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Telefone" name={"phone"} key={"phone"} id="phone">
            <InputPhone placeholder="(99) 99999-9999" />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Data de Nascimento"
            name={"birthDate"}
            key={"birthDate"}
            id="birthDate"
          >
            <DatePicker
              style={{ width: "100%" }}
              format={"DD/MM/YYYY"}
              placeholder="Selecione a data"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={{ span: 16 }}>
          <Form.Item
            label="Email"
            name={"username"}
            key={"username"}
            id="username"
            rules={[{ required: true, message: "Campo obrigatório!" }]}
          >
            <Input placeholder="Usuário" />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 8 }}>
          <Form.Item
            label="Senha"
            name={"password"}
            key={"password"}
            id="password"
            rules={[
              { required: requiredPassword, message: "Campo obrigatório!" },
            ]}
          >
            <Input.Password placeholder="Digite a senha" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
