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
import { StockItemsPage } from "@/components/pages/stock/StockItems";
import { StockViewPage } from "@/components/pages/stock/View";
import { UserView } from "@/components/pages/UserView";
import { WorkPage } from "@/components/pages/Work";
import { CreateWorkPage } from "@/components/pages/Work/Create";
import { WorkViewPage } from "@/components/pages/Work/View";
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
      { path: "users/:uuid", component: UserView },
      { path: "services", component: WorkPage },
      { path: "services/:uuid", component: WorkViewPage },
      { path: "services/create", component: CreateWorkPage },
      { path: "stocks/:uuid", component: StockViewPage },
      { path: "stocks/entrada", component: StockInputPage },
      { path: "stocks/saida", component: StockOutputPage },
      { path: "stocks/status", component: StockItemsPage },
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
