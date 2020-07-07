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

const Welcome: React.FC = () => {
  return (
    <Container>
      <IconSpace />
      <Span>
        <Title>Quero Açaí </Title>
        <P>
          Descubra batedeiras de açaí próximo à você e faça sua reserva direto
          com o vendedor.
        </P>
        <LoginButton>
          <LoginButtonText>Faça Login</LoginButtonText>
        </LoginButton>
        <TextBetweenButtons>ou</TextBetweenButtons>
        <RegisterButton>
          <RegisterButtonText>Registre-se</RegisterButtonText>
        </RegisterButton>
      </Span>
    </Container>
  );
};

export default Welcome;
