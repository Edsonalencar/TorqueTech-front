import { Button, Card, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { Work, WorkStatus } from "@/services/workService/dto";
import { useEffect, useState } from "react";
import { SelectSearchInput } from "@/components/atoms/Inputs/SelectSearchInput";
import { workStatusOptions } from "@/utils/utils";
import { WorkTable } from "@/components/molecules/tables/WorkTable";
import { useNavigate } from "react-router-dom";
import { Pageable } from "@/types";
import { WorkService } from "@/services/workService/service";
import { BasePagination } from "@/components/atoms/BasePagination";
import { Customer } from "@/services/customerService/dto";

export const WorkPage = () => {
  const [resource, setResource] = useState<Pageable<Work>>();
  const [status, setStatus] = useState<WorkStatus>();

  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCustomerView = (customer: Customer) => {
    navigate(`/app/customers/${customer?.id}`);
  };

  const handlerCreate = () => {
    navigate(`/app/services/create`);
  };

  const handlerView = (value: Work) => {
    navigate(`/app/services/${value.id}`);
  };

  const fetchPage = async (query?: string) => {
    setLoading(true);
    try {
      const { data } = await WorkService.getPage(page, {
        status,
        query,
      });
      setResource(data);
    } catch (error) {
      console.error("WorkPage", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page, status]);

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
              placeholder="Pesquise um produto ou placa..."
              allowClear
              onSearch={(value) => fetchPage(value)}
              style={{ width: 304 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handlerCreate}
            >
              Novo Serviço
            </Button>
          </Flex>
        </Flex>

        <Flex gap={20} vertical>
          <WorkTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            size="small"
            onViewCustomer={handleCustomerView}
            onView={handlerView}
          />

          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>
    </Card>
  );
};
