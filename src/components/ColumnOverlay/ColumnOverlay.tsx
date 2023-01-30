import React, { FC } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Overlay, OverlayProps } from '@rneui/base';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import IconButton from '@/UI/IconButton';
import Button from '@/UI/Button';
import Input from '@/UI/Input';
import { useAppDispatch } from '@/store/hooks';
import { Close as CloseIcon } from '@/assets/svgs';
import { colors } from '@/assets/styles/color';
import FormField from '../FormField';

import styles from './ColumnOverlay.module.scss';
import { rootRoutines } from '@/store/ducks';

type FormValues = {
  title: string;
};

type ColumnOverlayProps = Omit<OverlayProps, 'children'> & {
  onClose: () => void;
};

const ColumnOverlay: FC<ColumnOverlayProps> = ({
  onClose,
  style,
  backdropStyle,
  onBackdropPress = onClose,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, ...formProps } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      rootRoutines.columns.createColumn({
        ...data,
        description: 'New column',
      }),
    );
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
          <Text style={styles.overlayHeaderTitle}>New column</Text>
          <IconButton size="small" variant="light" onPress={onBackdropPress}>
            <CloseIcon fill={colors.$color800} />
          </IconButton>
        </View>
        <FormProvider control={control} handleSubmit={handleSubmit} {...formProps}>
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
                placeholder="Enter title of column"
              />
            )}
          />
        </FormProvider>
        <Button variant="primary" onPress={handleSubmit(onSubmit, onError)}>
          Add
        </Button>
      </View>
    </Overlay>
  );
};

export default ColumnOverlay;
