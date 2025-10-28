import React from 'react';

import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

import Input from '@/shared/ui/Input';

interface IControlledInput<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  testID?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
}

function ControlledInput<TFieldValues extends FieldValues>({
  control,
  name,
  testID,
  secureTextEntry,
  placeholder = '',
}: IControlledInput<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          testID={testID}
          value={(value as string) ?? ''}
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          error={error?.message ?? ''}
        />
      )}
    />
  );
}

export default ControlledInput;
