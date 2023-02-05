import React, { FC } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Dimensions, Text, View } from 'react-native';
import { Overlay, OverlayProps } from '@rneui/base';

import { colors } from '@/assets/styles/color';
import { Close as CloseIcon } from '@/assets/svgs';
import Button from '@/UI/Button';
import IconButton from '@/UI/IconButton';
import Input from '@/UI/Input';

import FormField from '../FormField';

import styles from './CreationModal.module.scss';

type FormValues = {
  title: string;
};

type CreationModalProps = Omit<OverlayProps, 'children'> & {
  title: string;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
};

const CreationModal: FC<CreationModalProps> = ({
  title,
  onSubmit,
  onClose,
  style,
  backdropStyle,
  onBackdropPress = onClose,
  ...props
}) => {
  const { reset, control, handleSubmit, ...formProps } = useForm<FormValues>();

  const submit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    return console.log(errors);
  };

  return (
    <Overlay
      onBackdropPress={onBackdropPress}
      backdropStyle={[styles.backdrop, backdropStyle]}
      overlayStyle={[
        styles.overlay,
        {
          width: Dimensions.get('window').width - 16 * 2,
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.overlayContent}>
        <View style={styles.overlayHeader}>
          <Text style={styles.overlayHeaderTitle}>New {title}</Text>
          <IconButton size="small" variant="light" onPress={onBackdropPress}>
            <CloseIcon fill={colors.color800} />
          </IconButton>
        </View>
        <FormProvider control={control} reset={reset} handleSubmit={handleSubmit} {...formProps}>
          <FormField
            name="title"
            rules={{
              required: 'Title is required',
            }}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
              <Input
                value={value}
                isDirty={isDirty}
                isError={!!error}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={`Enter the title of ${title}`}
              />
            )}
          />
        </FormProvider>
        <Button variant="primary" onPress={handleSubmit(submit, onError)}>
          Add
        </Button>
      </View>
    </Overlay>
  );
};

export default CreationModal;
