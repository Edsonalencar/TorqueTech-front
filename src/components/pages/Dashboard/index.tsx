import { BasePagination } from "@/components/atoms/BasePagination";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { DashboardMetric } from "@/components/molecules/DashboardMetric";
import { WorkTable } from "@/components/molecules/tables/WorkTable";
import { Customer } from "@/services/customerService/dto";
import { DashboardMetricsDTO } from "@/services/dashboardService/dto";
import { DashboardService } from "@/services/dashboardService/service";
import { Work } from "@/services/workService/dto";
import { WorkService } from "@/services/workService/service";
import { Pageable } from "@/types";
import { Card, DatePicker, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const DashboardPage = () => {
  const [metrics, setMetrics] = useState<DashboardMetricsDTO>();
  const [resource, setResource] = useState<Pageable<Work>>();
  const [loading, setLoading] = useState<boolean>(false);

  const [startAt, setStartAt] = useState(dayjs().startOf("month").toDate());
  const [endAt, setEndAt] = useState(dayjs().endOf("month").toDate());

  const { RangePicker } = DatePicker;
  const [page, setPage] = useState<number>(0);

  const navigate = useNavigate();

  const handleCustomerView = (customer: Customer) => {
    navigate(`/app/customers/${customer?.id}`);
  };

  const handlerView = (value: Work) => {
    navigate(`/app/services/${value.id}`);
  };

  const fetchPage = async (query?: string) => {
    setLoading(true);
    try {
      const { data } = await WorkService.getPage(page, {
        query,
      });
      setResource(data);
    } catch (error) {
      console.error("WorkPage", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const { data } = await DashboardService.getMetrics({
        endDate: dayjs(endAt).format("YYYY-MM-DD"),
        startDate: dayjs(startAt).format("YYYY-MM-DD"),
      });
      setMetrics(data);
    } catch (error) {
      console.error("fetchMetrics [DashboardPage]", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [endAt, startAt]);

  useEffect(() => {
    fetchPage();
  }, [page]);

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Flex gap={16} vertical>
        <RangePicker
          value={[dayjs(startAt), dayjs(endAt)]}
          onChange={(dates) => {
            if (dates && dates.length === 2) {
              setStartAt(dates[0]!.toDate());
              setEndAt(dates[1]!.toDate());
            }
          }}
          className="w-80"
          format="DD MMMM"
        />

        <DashboardMetric data={metrics} />

        <Card
          title={
            <Flex justify="space-between">
              <Typography.Title level={5} className="whitespace-nowrap">
                Serviços
              </Typography.Title>
              <Flex gap={8}>
                <Search
                  placeholder="Pesquise um produto ou placa..."
                  allowClear
                  onSearch={(value) => fetchPage(value)}
                  style={{ width: 304 }}
                />
              </Flex>
            </Flex>
          }
        >
          <Flex gap={20} vertical>
            <Flex gap={20} vertical>
              <WorkTable
                dataSource={resource?.content ?? []}
                pagination={false}
                loading={loading}
                size="small"
                onViewCustomer={handleCustomerView}
                onView={handlerView}
              />

              <BasePagination
                page={page}
                setPage={setPage}
                pageable={resource}
              />
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
