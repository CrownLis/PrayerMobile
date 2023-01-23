import React, { FC } from 'react';
import { Controller, ControllerProps, FieldValues, useController } from 'react-hook-form';
import { Text, View } from 'react-native';

import styles from './FormField.module.scss';

type FormFieldProps<FormValues extends FieldValues = any> = {
  label: string;
} & ControllerProps<FormValues>;

const FormField: FC<FormFieldProps> = ({
  name,
  label,
  rules,
  defaultValue,
  control,
  shouldUnregister,
  render,
}) => {
  const { fieldState } = useController({
    control,
    shouldUnregister,
    name,
    rules,
    defaultValue,
  });

  const { error } = fieldState;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={render}
      />
      {error ? <Text style={styles.error}>{error.message}</Text> : null}
    </View>
  );
};

export default FormField;
