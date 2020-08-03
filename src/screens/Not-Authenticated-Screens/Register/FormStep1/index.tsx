import React from 'react';

import Input from '@components/Input';

interface IFormStep1Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
}

const FormStep1: React.FC<IFormStep1Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm } = props;

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
