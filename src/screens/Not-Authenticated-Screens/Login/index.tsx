import React from 'react';

import Input from '@components/Input';
import KeyboardView from '@components/KeyboardView';
import { useAuth } from '@contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import getValidationErrors from '@utils/getValidationErrors';
import * as Yup from 'yup';

import {
  RetrievePasswordButton,
  RetrievePasswordText,
  Footer,
  RegisterButton,
  RegularText,
  RegisterButtonText,
} from './styles';
import * as S from './styles';

interface ISubmitForm {
  cpf_cnpj: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);
  const { logIn, loading } = useAuth();

  const handleSubmit = React.useCallback(
    async (data: ISubmitForm) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          cpf_cnpj: Yup.string().required('CPF ou CNPJ é obrigatório'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        const { cpf_cnpj, password } = data;
        logIn(cpf_cnpj, password);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [logIn],
  );

  const focusTargetInput = React.useCallback((field: string) => {
    const nameInput = formRef.current?.getFieldRef(field);
    nameInput.focus();
  }, []);

  const navigateToResetPassword = React.useCallback(() => {
    navigation.navigate('RecoveryPassword');
  }, [navigation]);

  return (
    <KeyboardView>
      <S.Container>
        <S.Title>Entre com sua{'\n'}conta</S.Title>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <S.Form>
            <Input
              icon="user"
              label="Sua credencial"
              name="cpf_cnpj"
              placeholder="Seu CPF ou CNPJ"
              autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => focusTargetInput('password')}
              containerStyle={{
                maxWidth: 350,
              }}
            />
            <Input
              containerStyle={{
                marginTop: 15,
                maxWidth: 350,
              }}
              icon="lock"
              label="Sua senha"
              name="password"
              placeholder="Sua senha secreta"
              autoCapitalize="none"
              secureTextEntry
              returnKeyType="send"
            />
            <S.ButtonSignIn
              onPress={() => formRef.current?.submitForm()}
              loading={loading}
            >
              Entrar
            </S.ButtonSignIn>

            <RetrievePasswordButton onPress={navigateToResetPassword}>
              <RetrievePasswordText>Esqueceu a senha?</RetrievePasswordText>
            </RetrievePasswordButton>
          </S.Form>
        </FormProvider>
        <Footer>
          <RegularText>Não tem uma conta?</RegularText>
          <RegisterButton onPress={() => navigation.navigate('Register')}>
            <RegisterButtonText>Registre-se aqui</RegisterButtonText>
          </RegisterButton>
        </Footer>
      </S.Container>
    </KeyboardView>
  );
};

export default Login;
