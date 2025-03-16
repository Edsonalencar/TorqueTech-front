import { MenuProps } from "antd";

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaUsersGear, FaUsersLine, FaBox } from "react-icons/fa6";
import { FaUsers, FaToolbox } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { LuFolderSymlink, LuFolderUp } from "react-icons/lu";
import { FaGear } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";

export interface NavegateItem {
  key: string;
  label: string;
  icon: React.FunctionComponentElement<IconBaseProps>;
  children?: NavegateItem[];
  show?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

interface NavegateItems {
  signOut: () => void;
  hasRole: (role: string) => boolean;
}

export const getNavegateItems = ({
  signOut,
  hasRole,
}: NavegateItems): MenuProps["items"] => {
  const items: NavegateItem[] = [
    {
      key: "/app/dashboard",
      label: "Dashboard",
      icon: React.createElement(MdHome),
    },
    {
      key: "/app/managers",
      label: "Gestores",
      icon: React.createElement(FaUsersLine),
      show: hasRole("ADMIN"),
    },
    {
      key: "/app/mechanics",
      label: "Mecanicos",
      icon: React.createElement(FaUsersGear),
    },
    {
      key: "/app/customers",
      label: "Clientes",
      icon: React.createElement(FaUsers),
    },
    {
      key: "/app/services",
      label: "Serviços",
      icon: React.createElement(FaToolbox),
    },
    {
      key: "/app/stocks",
      label: "Estoque",
      icon: React.createElement(FaBox),
      children: [
        {
          key: "/app/stocks/status",
          label: "Catálogo de produtos",
          icon: React.createElement(FaClipboardList),
        },
        {
          key: "/app/stocks/entrada",
          label: "Entrada",
          icon: React.createElement(LuFolderSymlink),
        },
        {
          key: "/app/stocks/saida",
          label: "Saída",
          icon: React.createElement(LuFolderUp),
        },
      ],
    },
    {
      key: "/app/config",
      label: "Configurações",
      icon: React.createElement(FaGear),
    },
    {
      key: "/login",
      label: "Sair",
      icon: React.createElement(FaSignOutAlt),
      onClick: signOut,
    },
  ];

  return items.filter((item) => item.show !== false);
};
