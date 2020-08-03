import React from 'react';

import Input from '@components/Input';

interface IFormStep3Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
}

const FormStep3: React.FC<IFormStep3Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm } = props;

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
        onSubmitEditing={onSubmitForm}
      />
    </>
  );
};

export default FormStep3;
