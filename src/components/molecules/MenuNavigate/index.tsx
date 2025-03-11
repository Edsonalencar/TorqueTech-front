import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { getNavegateItems } from "../../../config/navegateItems";

export const MenuNavigate: React.FC<MenuProps> = ({ ...rest }) => {
  const { signOut, hasRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = useMemo(() => {
    const path = location.pathname;
    const pathSplit = path.split("/");
    return `/${pathSplit[1]}/${pathSplit[2]}`;
  }, [location.pathname]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key); // Navega para a rota correspondente
  };

  return (
    <Menu
      className="border-none"
      theme="light"
      mode="inline"
      selectedKeys={[activePath]}
      items={getNavegateItems({ signOut, hasRole })}
      onClick={handleMenuClick}
      style={{ borderInlineEnd: "none" }}
      {...rest}
    />
  );
};
