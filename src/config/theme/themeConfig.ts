import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#5D9C59",
    borderRadius: 8,
    colorTextBase: "#474d5a",
  },
  components: {
    Menu: {
      iconSize: 15,
      fontSize: 15,
      colorBgBase: "transparent",
      colorBgContainer: "transparent",
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Layout: {
      headerBg: "#fff",
      headerColor: "#fff",
      bodyBg: "#fff",
    },
    Table: {
      fontSize: 15,
    },
    Typography: {
      colorText: "#000",
    },
  },
};
