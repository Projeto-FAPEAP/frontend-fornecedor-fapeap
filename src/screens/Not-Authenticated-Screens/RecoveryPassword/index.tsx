import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
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
  RegisterButton,
  RegularText,
  RegisterButtonText,
  P,
  BackButtonWrapper,
} from './styles';

const RecoveryPassword: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <BackButtonWrapper onPress={() => navigation.goBack()}>
            <Icon color="#84378F" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <Title>
            {`Recupere sua
conta`}
          </Title>
          <P>
            Por favor, insira o email da sua conta para receber o link de
            recuperação de senha.
          </P>
        </Header>
        <Form>
          <Input placeholder="Email associado a sua conta" />

          <LoginButton>
            <LoginButtonText>Recuperar Senha</LoginButtonText>
          </LoginButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default RecoveryPassword;
