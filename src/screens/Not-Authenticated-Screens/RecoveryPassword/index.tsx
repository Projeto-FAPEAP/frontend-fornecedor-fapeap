import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import getValidationErrors from '@utils/getValidationErrors';
import * as Yup from 'yup';

import { Container, Title, Form, Header, ButtonSubmit, P } from './styles';

interface ISubmitForm {
  email: string;
}
const RecoveryPassword: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = React.useCallback(async (data: ISubmitForm) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      const { email } = data;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <Title>Recupere sua{'\n'}senha</Title>
          <P>
            Por favor, insira o email da sua conta para receber o link de
            recuperação de senha.
          </P>
        </Header>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <Form>
            <Input
              icon="mail"
              label="E-mail"
              name="email"
              placeholder="Email associado a sua conta"
              autoCapitalize="none"
              returnKeyType="next"
              containerStyle={{
                maxWidth: 350,
              }}
            />

            <ButtonSubmit
              onPress={() => formRef.current?.submitForm()}
              loading={loading}
            >
              Recuperar Senha
            </ButtonSubmit>
          </Form>
        </FormProvider>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default RecoveryPassword;
