import React, { useState, useContext } from 'react';
import { Text, SafeAreaView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';

import AuthContext from '../../../contexts/auth';
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

const Login: React.FC = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useContext(AuthContext);

  function logInLocal(): void {
    if (email && password) {
      logIn(email, password);
    } else {
      Alert.alert('Aviso', 'Preencha todos os campos!');
    }
  }
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
          <Input
            placeholder="Seu email"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Sua senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <LoginButton onPress={() => logInLocal()}>
            <LoginButtonText>Entrar</LoginButtonText>
          </LoginButton>
          <RetrievePasswordButton
            onPress={() => navigation.navigate('RecoveryPassword')}
          >
            <RetrievePasswordText>Esqueceu a senha?</RetrievePasswordText>
          </RetrievePasswordButton>
        </Form>
        <Footer>
          <RegularText>Não tem uma conta?</RegularText>
          <RegisterButton onPress={() => navigation.navigate('Register')}>
            <RegisterButtonText>Registre-se aqui</RegisterButtonText>
          </RegisterButton>
        </Footer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Login;
