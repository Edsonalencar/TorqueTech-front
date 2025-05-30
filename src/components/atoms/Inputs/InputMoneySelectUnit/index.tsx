import { FC } from 'react';

import { InputNumber, Select } from 'antd';
import type { InputNumberProps } from 'antd/lib/input-number';

interface IProps
  extends Omit<InputNumberProps, 'decimalSeparator' | 'addonAfter'> {
  unit?: 'MONEY' | 'PERCENT';
  onSelectUnit?: (unit: string) => void;
}

export const InputMoneySelectUnit: FC<IProps> = ({
  className,
  unit = 'MONEY',
  onFocus = (event) => event.target.select(),
  precision = 2,
  onSelectUnit,
  ...props
}) => {
  const currencyFormatter = (value: any) => {
    if (!value) return '';

    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: precision,
    })
      .format(value)
      .slice(3);
  };

  const currencyParser = (val: any) => {
    try {
      if (!val) {
        return '';
      }

      // for when the input gets clears
      if (typeof val === 'string' && !val.length) {
        val = '0.0';
      }

      // detecting and parsing between comma and dot
      const group = new Intl.NumberFormat('pt-br')
        .format(1111)
        .replace(/1/g, '');
      const decimal = new Intl.NumberFormat('pt-br')
        .format(1.1)
        .replace(/1/g, '');
      let reversedVal = val.replace(new RegExp(`\\${group}`, 'g'), '');
      reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, 'g'), '.');
      //  => 1232.21 €

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, '');
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split('.')[1] || []).length;

      reversedVal =
        reversedVal * Math.pow(10, digitsAfterDecimalCount - precision);
      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
      console.error(error);
    }
  };

  const selectUnit = (
    <Select defaultValue={unit} style={{ width: 65 }} onSelect={onSelectUnit}>
      <Select.Option value="MONEY">R$</Select.Option>
      <Select.Option value="PERCENT">%</Select.Option>
    </Select>
  );

  return (
    <InputNumber
      {...props}
      formatter={currencyFormatter}
      parser={currencyParser}
      decimalSeparator=","
      className={className ?? 'input'}
      addonAfter={selectUnit}
      onFocus={onFocus}
      precision={precision}
    />
  );
};
