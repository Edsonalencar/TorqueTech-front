import { MenuProps } from "antd";

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaUsersGear, FaUsersLine, FaBox } from "react-icons/fa6";
import { FaUsers, FaToolbox } from "react-icons/fa";

interface NavegateItems {
  signOut: () => void;
}

export const getNavegateItems = ({
  signOut,
}: NavegateItems): MenuProps["items"] => {
  return [
    {
      key: "/app/dashboard",
      label: "Dashboard",
      icon: React.createElement(MdHome),
    },
    {
      key: "/app/managers",
      label: "Gestores",
      icon: React.createElement(FaUsersLine),
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
      style: { position: "absolute", bottom: 0 },
    },
  ];
};
