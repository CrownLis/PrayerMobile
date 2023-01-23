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

import styles from './SignUp.module.scss';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const { control, watch, handleSubmit, ...formProps } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log({ data });
  };

  const onError: SubmitErrorHandler<FormValues> = errors => {
    return console.log(errors);
  };

  return (
    <View style={styles.container}>
      <Text>Registration</Text>
      <FormProvider
        watch={watch}
        control={control}
        handleSubmit={handleSubmit}
        {...formProps}
      >
        <FormField
          label="Name"
          name="name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name field must be at leat 2 characters',
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
              placeholder="Enter your first name"
            />
          )}
        />
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
            <Input
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
        <FormField
          label="Confirm password"
          name="confirmPassword"
          rules={{
            required: 'Confirm password is required',
            validate: value => value === watch('password') || "Passwords don't match",
          }}
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error, isDirty },
          }) => (
            <Input
              isDirty={isDirty}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              isError={!!error}
              placeholder="Enter your password again"
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

export default SignUp;
