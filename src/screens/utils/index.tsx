import React from 'react';
import { Modal, ActivityIndicator, View } from 'react-native';

import { ModalBackground, LoadingCircle } from './styles';

interface ILoaderProps {
  loading: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ loading }) => {
  return (
    <ModalBackground>
      <LoadingCircle>
        <ActivityIndicator animating={loading} color="#84378F" />
      </LoadingCircle>
    </ModalBackground>
  );
};

export default Loader;
