import { AdminPage } from "@/components/pages/Admin";
import { AdminConfigPage } from "@/components/pages/Admin/Config";
import { ViewAdminPage } from "@/components/pages/Admin/View";
import { AdminViewUserPage } from "@/components/pages/Admin/ViewUser";
import { ConfigPage } from "@/components/pages/Config";
import { CustomerPage } from "@/components/pages/Customer";
import { CreateCustomerPage } from "@/components/pages/Customer/Create";
import { ViewCustomerPage } from "@/components/pages/Customer/View";
import { DashboardPage } from "@/components/pages/Dashboard";
import { LoginPage } from "@/components/pages/Login";
import { managerPage } from "@/components/pages/Managers";
import { ViewManagerPage } from "@/components/pages/Managers/View";
import { MechanicPage } from "@/components/pages/Mechanics";
import { ViewMechanicPage } from "@/components/pages/Mechanics/View";
import { StockInputPage } from "@/components/pages/stock/Input";
import { StockOutputPage } from "@/components/pages/stock/Output";
import { WorkPage } from "@/components/pages/Work";
import { LayoutAdminTemplate } from "@/components/templates/LayoutAdminTemplate";
import { LayoutTemplate } from "@/components/templates/LayoutTemplate";
import { RenderRouter } from "@/types";

export const routes: RenderRouter[] = [
  { path: "/login", component: LoginPage },
  {
    path: "/app",
    component: LayoutTemplate,
    children: [
      { path: "dashboard", component: DashboardPage },
      { path: "managers", component: managerPage },
      { path: "managers/:uuid", component: ViewManagerPage },
      { path: "mechanics", component: MechanicPage },
      { path: "mechanics/:uuid", component: ViewMechanicPage },
      { path: "customers", component: CustomerPage },
      { path: "customers/create", component: CreateCustomerPage },
      { path: "customers/:uuid", component: ViewCustomerPage },
      { path: "services", component: WorkPage },
      { path: "stocks/entrada", component: StockInputPage },
      { path: "stocks/saida", component: StockOutputPage },
      { path: "config", component: ConfigPage },
    ],
  },
  {
    path: "/admin",
    component: LayoutAdminTemplate,
    children: [
      { path: "/admin", component: AdminPage },
      { path: "/admin/:uuid", component: ViewAdminPage },
      { path: "user/:uuid", component: AdminViewUserPage },
      { path: "config", component: AdminConfigPage },
    ],
  },
];
