import React from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import FormField from '@/components/FormField';
import Button from '@/UI/Button';
import Input from '@/UI/Input';
import PasswordInput from '@/UI/PasswordInput';
import { validateEmail } from '@/utils/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { rootRoutines, rootSelectors } from '@/store/ducks';
import { GuestStackParamList } from '@/navigation/GuestNav/GuestNav';

import backgroundImg from '@/assets/images/background-1.png';

import styles from './SignIn.module.scss';

type FormValues = {
  email: string;
  password: string;
};

type Props = NativeStackScreenProps<GuestStackParamList, 'Sign In'>;

const SignIn = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(rootSelectors.auth.getAuthState);

  const { control, handleSubmit, ...formProps } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(rootRoutines.auth.signIn(data));
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    return console.log(errors);
  };

  const goToSignUp = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Log in</Text>
            <FormProvider control={control} handleSubmit={handleSubmit} {...formProps}>
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
            </FormProvider>
            <Button variant="primary" onPress={handleSubmit(onSubmit, onError)} isLoading={loading}>
              Confirm
            </Button>
            <Text style={styles.signUp}>
              Don`t have an account?{' '}
              <Text style={styles.signUp_link} onPress={goToSignUp}>
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
