import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  Span,
  IconSpace,
  P,
  LoginButton,
  LoginButtonText,
  RegisterButton,
  RegisterButtonText,
  TextBetweenButtons,
} from './styles';

const Welcome: React.FC = ({ navigation }) => {
  return (
    <Container>
      <IconSpace />
      <Span>
        <Title>Quero Açaí </Title>
        <P>
          Descubra uma nova forma de conectar-se com seus clientes e embarque no
          digital.
        </P>
        <LoginButton>
          <LoginButtonText onPress={() => navigation.navigate('Login')}>
            Faça Login
          </LoginButtonText>
        </LoginButton>
        <TextBetweenButtons>ou</TextBetweenButtons>
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <RegisterButtonText>Registre-se</RegisterButtonText>
        </RegisterButton>
      </Span>
    </Container>
  );
};

export default Welcome;
