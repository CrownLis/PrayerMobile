import React from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Text, View } from 'react-native';

import FormField from '~components/FormField';
import Button from '~UI/Button';
import Input from '~UI/Input';
import PasswordInput from '~UI/PasswordInput';

import styles from './SignIn.module.scss';

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { control, handleSubmit, ...formProps } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log({ data });
  };

  const onError: SubmitErrorHandler<FormValues> = errors => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      <Text>Log in</Text>
      <FormProvider control={control} handleSubmit={handleSubmit} {...formProps}>
        <FormField
          label="Email"
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Enter correct e-mail',
            },
          }}
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error, isDirty },
          }) => (
            <Input
              isDirty={isDirty}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isError={!!error}
              placeholder="Enter your e-mail"
            />
          )}
        />
        <FormField
          label="Password"
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password field must be at leat 5 characters',
            },
          }}
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error, isDirty },
          }) => (
            <PasswordInput
              isDirty={isDirty}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isError={!!error}
              placeholder="Enter your password"
            />
          )}
        />
      </FormProvider>
      <Button variant="primary" onPress={handleSubmit(onSubmit, onError)}>
        Confirm
      </Button>
    </View>
  );
};

export default SignIn;
