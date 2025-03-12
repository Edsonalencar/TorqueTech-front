import { Button, Card, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { WorkStatus } from "@/services/workService/dto";
import { useState } from "react";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { workStatusOptions } from "@/utils/utils";
import { Board } from "@/components/molecules/Board";

export const WorkPage = () => {
  const [status, setStatus] = useState<WorkStatus>();

  return (
    <Card>
      <Flex gap={20} vertical>
        <Flex justify="space-between">
          <Typography.Title level={4} className="whitespace-nowrap">
            Serviços
          </Typography.Title>
          <Flex gap={8}>
            <SelectSearchInput
              placeholder="Filtre por status"
              onSelect={(value) => setStatus(value as WorkStatus)}
              options={workStatusOptions}
              className="w-48"
              onClear={() => setStatus(undefined)}
              allowClear
            />
            <Search
              placeholder="Pesquise um produtor..."
              allowClear
              onSearch={(value) => {}}
              style={{ width: 304 }}
            />
            <Button type="primary" icon={<PlusOutlined />}>
              Novo Serviço
            </Button>
          </Flex>
        </Flex>

        <Board />
      </Flex>
    </Card>
  );
};
