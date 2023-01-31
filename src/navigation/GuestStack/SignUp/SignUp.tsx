import React from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { GuestStackParamList } from '@/navigation/GuestNav/GuestNav';
import FormField from '@/components/FormField';
import Button from '@/UI/Button';
import Input from '@/UI/Input';
import PasswordInput from '@/UI/PasswordInput';
import { validateEmail } from '@/utils/validation';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './SignUp.module.scss';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpScreenProps = NativeStackScreenProps<GuestStackParamList, 'Sign Up'>;

const SignUp = () => {
  const { control, watch, handleSubmit, ...formProps } = useForm<FormValues>();

  const { navigate } = useNavigation<SignUpScreenProps['navigation']>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    navigate('Greetings', { ...data });
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    return console.log(errors);
  };

  const goToSignIn = () => {
    navigate('Sign In');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background}>
        <View style={styles.formContainer}>
          <ScrollView>
            <Text style={styles.title}>Registration</Text>
            <FormProvider watch={watch} control={control} handleSubmit={handleSubmit} {...formProps}>
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
                render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
                  <Input
                    value={value}
                    isDirty={isDirty}
                    isError={!!error}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Enter your first name"
                  />
                )}
              />
              <FormField
                label="Email"
                name="email"
                rules={{
                  required: 'Email is required',
                  validate: validateEmail,
                }}
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
                  <Input
                    value={value}
                    isDirty={isDirty}
                    isError={!!error}
                    onBlur={onBlur}
                    onChangeText={onChange}
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
                render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
                  <PasswordInput
                    value={value}
                    isDirty={isDirty}
                    isError={!!error}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Enter your password"
                  />
                )}
              />
              <FormField
                label="Confirm password"
                name="confirmPassword"
                rules={{
                  required: 'Confirm password is required',
                  validate: (value) => value === watch('password') || "Passwords don't match",
                }}
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
                  <PasswordInput
                    value={value}
                    isDirty={isDirty}
                    isError={!!error}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Enter your password again"
                  />
                )}
              />
            </FormProvider>
            <Button variant="primary" onPress={handleSubmit(onSubmit, onError)}>
              Register
            </Button>
            <Text style={styles.signIn}>
              Already have an account?{' '}
              <Text style={styles.signIn_link} onPress={goToSignIn}>
                Log in
              </Text>
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;
