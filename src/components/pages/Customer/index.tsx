import { Button, Card, Flex, Radio, Typography } from "antd";
import Search from "antd/es/input/Search";
import { PlusOutlined } from "@ant-design/icons";
import { Pageable } from "@/types";
import { useEffect, useState } from "react";
import { CustomerTable } from "@/components/molecules/tables/CustomerTable";
import { BasePagination } from "@/components/atoms/BasePagination";
import { useNavigate } from "react-router-dom";
import { UserStatus } from "@/types/authTypes";
import { UserService } from "@/services/userService/service";
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

  const handleView = (Customer: Customer) => {
    navigate(`/app/customers/${Customer?.id}`);
  };

  const handleCreateOrUpdate = (Customer?: Customer) => {
    navigate(`/app/customers/create/${Customer?.id ?? ""}`);
  };

  const fetchPage = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await CustomerService.getPage(page, {
        status,
        name,
      });
      console.log("fetchCustomers", data);
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
    <Card>
      <Flex gap={20} vertical className="overflow-hidden">
        <Flex justify="space-between">
          <Typography.Title level={4}>Clientes</Typography.Title>
          <Flex gap={8}>
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
