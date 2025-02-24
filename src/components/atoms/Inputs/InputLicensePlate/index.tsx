import { FC } from "react";

import { Input } from "antd";
import type { InputProps } from "antd/es/input";
import { formatLicensePlate } from "@/utils/formaters/format";

export const InputLicensePlate: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatLicensePlate(event.target?.value ?? "");

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};
