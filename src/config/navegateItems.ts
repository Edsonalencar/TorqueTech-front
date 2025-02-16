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
      key: "/dashboard",
      label: "Dashboard",
      icon: React.createElement(MdHome),
    },
    {
      key: "/managers",
      label: "Gestores",
      icon: React.createElement(FaUsersLine),
    },
    {
      key: "/machanics",
      label: "Mecanicos",
      icon: React.createElement(FaUsersGear),
    },
    {
      key: "/customers",
      label: "Clientes",
      icon: React.createElement(FaUsers),
    },
    {
      key: "/services",
      label: "Serviços",
      icon: React.createElement(FaToolbox),
    },
    {
      key: "/stocks",
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
