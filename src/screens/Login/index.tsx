import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Input,
  LoginButton,
  LoginButtonText,
  RetrievePasswordButton,
  RetrievePasswordText,
  Form,
  Header,
  Footer,
  RegisterButton,
  RegularText,
  RegisterButtonText,
} from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <Title>
            {`Entre com sua 
conta`}
          </Title>
        </Header>
        <Form>
          <Input placeholder="Seu email" />
          <Input placeholder="Sua senha" />
          <LoginButton>
            <LoginButtonText>Entrar</LoginButtonText>
          </LoginButton>
          <RetrievePasswordButton>
            <RetrievePasswordText>Esqueceu a senha?</RetrievePasswordText>
          </RetrievePasswordButton>
        </Form>
        <Footer>
          <RegularText>Não tem uma conta?</RegularText>
          <RegisterButton>
            <RegisterButtonText>Registre-se aqui</RegisterButtonText>
          </RegisterButton>
        </Footer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Login;
