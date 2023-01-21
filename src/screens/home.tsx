import React from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {Text, View} from 'react-native';
import Button from '../UI/Button';
import DeleteButton from '../UI/DeleteButton';
import IconButton from '../UI/IconButton/IconButton';
import Input from '../UI/Input';

const HomePage = () => {
  type FormValues = {
    email: string;
    password: string;
  };

  const {...methods} = useForm();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log({data});
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <View>
      <Text>Home</Text>

      <IconButton variant="send" />
      <DeleteButton size="large" />
      <FormProvider {...methods}>
        <Input
          name="email"
          label="Email"
          placeholder="email-address"
          rules={{required: 'Email is req!'}}
        />
        <Input
          name="password"
          label="Password"
          placeholder="Password"
          rules={{required: 'pass is req!'}}
          secureTextEntry
        />
      </FormProvider>
      <Button
        variant="primary"
        onPress={methods.handleSubmit(onSubmit, onError)}>
        Text
      </Button>
    </View>
  );
};

export default HomePage;
