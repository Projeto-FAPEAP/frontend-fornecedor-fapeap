import React from 'react';

import Input from '@components/Input';

interface IFormStep2Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
}

const FormStep2: React.FC<IFormStep2Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm } = props;

  return (
    <>
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="smile"
        label="Nome fantasia"
        name="nome_fantasia"
        placeholder="Nome fantasia"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => focusTargetInput('telefone')}
        returnKeyType="next"
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="phone"
        label="Telefone para contato"
        name="telefone"
        placeholder="Telefone para contato"
        keyboardType="number-pad"
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('telefone_whatsapp')}
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="message-circle"
        label="Telefone whatsapp"
        name="telefone_whatsapp"
        placeholder="Telefone whatsapp"
        keyboardType="number-pad"
        returnKeyType="send"
        onSubmitEditing={onSubmitForm}
      />
    </>
  );
};

export default FormStep2;
