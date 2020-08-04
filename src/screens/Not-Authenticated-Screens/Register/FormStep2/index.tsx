import React from 'react';
import { MaskService } from 'react-native-masked-text';

import Input from '@components/Input';
import { FormHandles } from '@unform/core';

interface IFormStep2Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
  formRef: React.RefObject<FormHandles>;
}

const FormStep2: React.FC<IFormStep2Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm, formRef } = props;

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
        onChangeText={(text) => {
          const formatted = MaskService.toMask('cel-phone', text, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          });
          formRef.current?.setFieldValue('telefone', formatted);
        }}
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
        onChangeText={(text) => {
          const formatted = MaskService.toMask('cel-phone', text, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          });
          formRef.current?.setFieldValue('telefone_whatsapp', formatted);
        }}
      />
    </>
  );
};

export default FormStep2;
