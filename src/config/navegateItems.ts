import { MenuProps } from "antd";

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaUsersGear, FaUsersLine, FaBox } from "react-icons/fa6";
import { FaUsers, FaToolbox } from "react-icons/fa";
import { IconBaseProps } from "react-icons";

export interface NavegateItem {
  key: string;
  label: string;
  icon: React.FunctionComponentElement<IconBaseProps>;
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
      label: "Produtos",
      icon: React.createElement(FaBox),
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
