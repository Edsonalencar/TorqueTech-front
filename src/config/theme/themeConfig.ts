import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#49682F",
    borderRadius: 4,
  },
  components:{
    Menu:{
      iconSize:25,
      colorBgContainer: "#49682F",
      colorPrimary: "#49682F",
      colorText: "#FFF",
    },
    Button:{
      borderRadius:2,
    },
    Input:{
      borderRadius:2
    },
    Layout:{
      headerBg: "#fff",
      headerColor: "#fff",
    },
  }
};