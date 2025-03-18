import { FC } from "react";

import { Input } from "antd";
import type { InputProps } from "antd/es/input";
import { formatProductCode } from "@/utils/formaters/formatProductCode";

export const InputProductCode: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatProductCode(event.target?.value ?? "");

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};
