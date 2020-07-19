import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import { ModalBackground, LoadingCircle } from './styles.js';
function Loader(props) {
  const { loading, ...atributes } = props;
  return (
    <Modal transparent animationType="none" visible={loading}>
      <ModalBackground>
        <LoadingCircle>
          <ActivityIndicator animating={loading} color={'#84378F'} />
        </LoadingCircle>
      </ModalBackground>
    </Modal>
  );
}
export default Loader;
