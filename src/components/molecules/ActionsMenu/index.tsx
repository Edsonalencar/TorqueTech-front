import { SlOptionsVertical } from "react-icons/sl";
import { Dropdown } from "antd";
import { MenuProps } from "antd/lib";

export interface CustomActions {
  onClick: () => void;
  label?: string;
  show?: boolean;
}

interface ActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onConclude?: () => void;
  onDisable?: () => void;
  onEnable?: () => void;
  actions?: CustomActions[];
}

export const ActionsMenu = ({
  onView,
  onEdit,
  onCancel,
  onConclude,
  onDelete,
  onDisable,
  onEnable,
  actions,
}: ActionMenuProps) => {
  const items: MenuProps["items"] = [];

  onView && items.push({ key: "view", onClick: onView, label: "Visualizar" });
  onEdit && items.push({ key: "edit", onClick: onEdit, label: "Editar" });
  onEnable && items.push({ key: "enable", onClick: onEnable, label: "Ativar" });

  onDisable &&
    items.push({ key: "desable", onClick: onDisable, label: "Desativar" });

  onDelete &&
    items.push({ key: "delete", onClick: onDelete, label: "Excluir" });

  onCancel &&
    items.push({ key: "cancel", onClick: onCancel, label: "Cancelar" });

  onConclude &&
    items.push({ key: "conclude", onClick: onConclude, label: "Concluir" });

  actions &&
    actions
      .filter((item) => item.show != false)
      .forEach((action, i) => {
        if (items.includes({ key: `custom-action-${i}` })) return;
        items.push({
          key: `custom-action-${i}`,
          onClick: action.onClick,
          label: action.label,
        });
      });

  return (
    <Dropdown menu={{ items }} placement="bottom">
      <div className="cursor-pointer flex justify-center items-center rounded-full p-2 max-w-min  text-black hover:bg-gray-200">
        <SlOptionsVertical />
      </div>
    </Dropdown>
  );
};
