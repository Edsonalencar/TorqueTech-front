import { MenuProps } from "antd";

import React from "react";
import { MdLogout } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { IconBaseProps } from "react-icons";
import { LuFolderSymlink, LuFolderUp } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi2";
import { RiUserSearchLine, RiUserSettingsLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";

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
      icon: React.createElement(HiOutlineHome),
    },
    {
      key: "/app/managers",
      label: "Gestores",
      icon: React.createElement(RiUserSearchLine),
      show: hasRole("ADMIN"),
    },
    {
      key: "/app/mechanics",
      label: "Mecanicos",
      icon: React.createElement(RiUserSettingsLine),
    },
    {
      key: "/app/customers",
      label: "Clientes",
      icon: React.createElement(LuUsers),
    },
    {
      key: "/app/services",
      label: "Serviços",
      icon: React.createElement(TfiLayoutListThumb),
    },
    {
      key: "/app/stocks",
      label: "Estoque",
      icon: React.createElement(BsBoxSeam),
      children: [
        {
          key: "/app/stocks/status",
          label: "Catálogo de produtos",
          icon: React.createElement(LuClipboardList),
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
      icon: React.createElement(BsGear),
    },
    {
      key: "/login",
      label: "Sair",
      icon: React.createElement(MdLogout),
      onClick: signOut,
    },
  ];

  return items.filter((item) => item.show !== false);
};
