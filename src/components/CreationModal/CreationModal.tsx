import React, { FC } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { OverlayProps } from '@rneui/base';

import Button from '@/UI/Button';
import Input from '@/UI/Input';
import Modal from '@/UI/Modal';

import FormField from '../FormField';

type FormValues = {
  title: string;
};

type CreationModalProps = Omit<OverlayProps, 'children'> & {
  title: string;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
};

const CreationModal: FC<CreationModalProps> = ({ title, onSubmit, onClose, ...props }) => {
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
    <Modal showCross title={`New ${title}`} onClose={onClose} {...props}>
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
    </Modal>
  );
};

export default CreationModal;
