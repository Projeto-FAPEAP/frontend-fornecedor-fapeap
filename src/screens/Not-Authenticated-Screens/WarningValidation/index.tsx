import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  Input,
  RetrievePasswordButton,
  RetrievePasswordText,
  Form,
  Header,
  RegisterButton,
  RegularText,
  RegisterButtonText,
  P,
  BackButtonWrapper,
  TextWrapper,
} from './styles';

const WarningValidation: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <BackButtonWrapper onPress={() => navigation.navigate('Welcome')}>
            <Icon color="#84378F" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <Title>Aviso</Title>
        </Header>
        <Form>
          <TextWrapper>
            <P>
              Seu Cadasto foi encaminhado para validação, aguarde o processo de
              avaliação para utilizar a aplicação.
            </P>
          </TextWrapper>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default WarningValidation;
