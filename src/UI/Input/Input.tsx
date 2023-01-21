import React, {FC, forwardRef, ForwardRefRenderFunction} from 'react';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {mergeStyles} from '../../utils/mergeStyles';
import styles from './Input.module.scss';

type InputProps = {
  placeholder: string;
  label: string;
  defaultValue?: string;
  isDisabled?: boolean;
  isError?: boolean;
  isDirty?: boolean;
} & TextInputProps &
  UseControllerProps;

const ControlledInput: FC<InputProps> = ({
  name,
  label,
  placeholder,
  rules,
  defaultValue,
  isDirty,
  isDisabled,
  isError,
  ...props
}) => {
  const formContext = useFormContext();
  const {formState} = formContext;
  const {field} = useController({name, rules, defaultValue});

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        ref={field.ref}
        style={mergeStyles(
          {style: styles.customInput, active: true},
          {
            style: styles.customInput_disabled,
            active: isDisabled ? true : false,
          },
          {
            style: styles.customInput_correct,
            active: isDirty ? true : false,
          },
          {style: styles.customInput_error, active: isError ? true : false},
        )}
        value={field.value}
        placeholder={placeholder}
        onChangeText={field.onChange}
        editable={isDisabled ? false : true}
        selectTextOnFocus={isDisabled ? false : true}
      />
      {isDirty ? (
        <Svg width={20} height={20}>
          <Path
            fill="#39C622"
            d="M16.704 2.653a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143z"
          />
        </Svg>
      ) : null}
      {isError ? <Text>This field must be filled!</Text> : null}
    </View>
  );
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name,
  ...props
}) => {
  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapper by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return <ControlledInput name={name} {...props} />;
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
