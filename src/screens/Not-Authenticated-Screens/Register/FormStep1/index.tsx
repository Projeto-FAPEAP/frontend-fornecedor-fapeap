import React from 'react';
import { MaskService } from 'react-native-masked-text';

import Input from '@components/Input';
import { FormHandles } from '@unform/core';

interface IFormStep1Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
  formRef: React.RefObject<FormHandles>;
}

const FormStep1: React.FC<IFormStep1Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm, formRef } = props;

  return (
    <>
      <Input
        icon="user"
        label="Seu nome"
        name="nome"
        placeholder="Seu nome completo"
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('email')}
        containerStyle={{
          maxWidth: 350,
        }}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="mail"
        label="Seu email"
        name="email"
        placeholder="Sua email"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => focusTargetInput('cpf_cnpj')}
        returnKeyType="next"
      />

      <Input
        icon="info"
        label="Seu CPF ou CNPJ"
        name="cpf_cnpj"
        placeholder="Seu CPF ou CNPJ"
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="number-pad"
        onSubmitEditing={() => focusTargetInput('senha')}
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        onChangeText={(text) => {
          const size = text.length;
          let formatted = text;

          if (size <= 14) {
            formatted = MaskService.toMask('cpf', text);
          } else {
            formatted = MaskService.toMask('cnpj', text);
          }

          formRef.current?.setFieldValue('cpf_cnpj', formatted);
        }}
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="lock"
        label="Senha"
        name="senha"
        placeholder="Sua senha secreta"
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('password_confirmation')}
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="lock"
        label="Confirmar senha"
        name="password_confirmation"
        placeholder="Confirme sua senha"
        secureTextEntry
        returnKeyType="send"
        onSubmitEditing={onSubmitForm}
      />
    </>
  );
};

export default FormStep1;
