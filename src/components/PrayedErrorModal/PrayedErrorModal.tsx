import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { getPrayersError } from '@/store/ducks/prayers/selectors';
import { useAppSelector } from '@/store/hooks';
import Button from '@/UI/Button';
import Modal from '@/UI/Modal';

import styles from './PrayedErrorModal.module.scss';

const PrayedErrorModal = () => {
  const error = useAppSelector(getPrayersError);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error === '400') {
      setIsVisible(true);
    }
  }, [error]);

  return (
    <Modal showCross={false} title={'Sorry!'} onClose={() => setIsVisible(false)} isVisible={isVisible}>
      <Text style={styles.text}>The counter can be pressed once per hour.</Text>
      <Button variant="primary" onPress={() => setIsVisible(false)}>
        OK
      </Button>
    </Modal>
  );
};

export default PrayedErrorModal;
