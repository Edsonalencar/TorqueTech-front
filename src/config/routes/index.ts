import { AdminPage } from "@/components/pages/Admin";
import { ViewAdminPage } from "@/components/pages/Admin/View";
import { CustomerPage } from "@/components/pages/Customer";
import { DashboardPage } from "@/components/pages/Dashboard";
import { LoginPage } from "@/components/pages/Login";
import { managerPage } from "@/components/pages/Managers";
import { ViewManagerPage } from "@/components/pages/Managers/View";
import { MechanicPage } from "@/components/pages/Mechanics";
import { ViewMechanicPage } from "@/components/pages/Mechanics/View";
import { StockPage } from "@/components/pages/Stock";
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
      { path: "services", component: WorkPage },
      { path: "stocks", component: StockPage },
    ],
  },
  {
    path: "/admin",
    component: LayoutAdminTemplate,
    children: [
      { path: "/admin", component: AdminPage },
      { path: "/admin/:uuid", component: ViewAdminPage },
    ],
  },
];
