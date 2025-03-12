import { InputMoney } from "@/components/atoms/Inputs/InputMoney";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { CreateWorkRequestDTO } from "@/services/workService/dto";
import { Button, FormProps, Typography } from "antd";
import { Col, Form, Input, Row, DatePicker } from "antd";
import { useState } from "react";
import { FiMinusCircle } from "react-icons/fi";

interface Props extends FormProps<CreateWorkRequestDTO> {}

export const CreateWorkForm = ({ ...rest }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Form layout="vertical" {...rest}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Title level={5}>Detalhes do Trabalho</Typography.Title>
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
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Início Previsto" name="startAt">
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
