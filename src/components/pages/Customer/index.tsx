import { Button, Card, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { Pageable } from "@/types";
import { useEffect, useState } from "react";
import { CustomerTable } from "@/components/molecules/tables/CustomerTable";
import { BasePagination } from "@/components/atoms/BasePagination";
import { useNavigate } from "react-router-dom";
import { UserStatus } from "@/types/authTypes";
import { Customer } from "@/services/customerService/dto";
import { CustomerService } from "@/services/customerService/service";
import { CreateCustomerModal } from "@/components/molecules/modais/CreateCustomerModal";

export const CustomerPage: React.FC = () => {
  const [resource, setResource] = useState<Pageable<Customer>>();
  const [status, setStatus] = useState<UserStatus>(UserStatus.ACTIVE);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [createCustomerModal, setCreateCustomerModal] =
    useState<boolean>(false);
  const [selectedEditCustomer, setSelectedEditCustomer] = useState<Customer>();

  const navigate = useNavigate();

  const handleView = (customer: Customer) => {
    navigate(`/app/customers/${customer?.id}`);
  };

  const handleCreateOrUpdate = (customer?: Customer) => {
    navigate(`/app/customers/create/${customer?.id ?? ""}`);
  };

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await CustomerService.getPage(page, {
        status,
        name,
      });
      setResource(data);
    } catch (error) {
      console.error("fetchCustomers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [page, status]);

  return (
    <Card
      title={
        <Flex justify="space-between">
          <Typography.Title level={5} className="whitespace-nowrap">
            Clientes
          </Typography.Title>
          <Flex gap={8}>
            <Radio.Group
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="ACTIVE">Ativos</Radio.Button>
              <Radio.Button value="INACTIVE">Inativos</Radio.Button>
            </Radio.Group>
            <Search
              placeholder="Pesquise pelo nome..."
              allowClear
              onSearch={(value) => fetchPage(value)}
              style={{ width: 304 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleCreateOrUpdate()}
            >
              Novo Cliente
            </Button>
          </Flex>
        </Flex>
      }
    >
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex gap={20} vertical>
          <CustomerTable
            dataSource={resource?.content ?? []}
            pagination={false}
            loading={loading}
            onView={handleView}
            onEdit={(Customer) => setSelectedEditCustomer(Customer)}
          />
          <BasePagination page={page} setPage={setPage} pageable={resource} />
        </Flex>
      </Flex>

      <CreateCustomerModal
        isOpen={createCustomerModal || !!selectedEditCustomer}
        onClose={() => {
          setCreateCustomerModal(false);
          setSelectedEditCustomer(undefined);
        }}
        initialData={selectedEditCustomer}
        reload={fetchPage}
      />
    </Card>
  );
};
