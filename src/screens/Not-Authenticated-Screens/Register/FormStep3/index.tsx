import React from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text';

import Input from '@components/Input';
import { FormHandles } from '@unform/core';
import Axios from 'axios';

interface ICEPResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface IFormStep3Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
  formRef: React.RefObject<FormHandles>;
}

const FormStep3: React.FC<IFormStep3Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm, formRef } = props;
  const [cep, setCep] = React.useState('');

  React.useEffect(() => {
    if (cep.length === 9) {
      Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { logradouro, bairro, localidade, uf } = response.data;

          formRef.current?.setFieldValue('logradouro', logradouro);
          formRef.current?.setFieldValue('bairro', bairro);
          formRef.current?.setFieldValue('cidade', localidade);
          formRef.current?.setFieldValue('uf', uf);
        })
        .catch(() => {
          Alert.alert('Cuidado', 'Você informou um CEP inválido ');
        });
    }
  }, [cep, formRef]);

  return (
    <>
      <Input
        icon="map-pin"
        label="CEP"
        name="cep"
        placeholder="CEP"
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="number-pad"
        onSubmitEditing={() => focusTargetInput('logradouro')}
        containerStyle={{
          maxWidth: 350,
        }}
        onChangeText={(text) => {
          setCep(text);
          const formatted = MaskService.toMask('custom', text, {
            mask: '99999-999',
          });
          formRef.current?.setFieldValue('cep', formatted);
        }}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="map"
        label="Logradouro"
        name="logradouro"
        placeholder="Logradouro"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => focusTargetInput('bairro')}
        returnKeyType="next"
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="map"
        label="Bairro"
        name="bairro"
        placeholder="Bairro"
        returnKeyType="send"
        onSubmitEditing={() => focusTargetInput('numero_local')}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="hash"
        label="Número da casa"
        name="numero_local"
        placeholder="Número da casa"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('cidade')}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="hash"
        label="Cidade"
        name="cidade"
        placeholder="Cidade"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('uf')}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="hash"
        label="UF"
        name="uf"
        placeholder="UF"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={onSubmitForm}
      />
    </>
  );
};

export default FormStep3;
