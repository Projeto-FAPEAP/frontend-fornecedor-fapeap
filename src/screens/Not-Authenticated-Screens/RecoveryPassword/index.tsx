import React from 'react';
import { Text, SafeAreaView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaskService } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import getValidationErrors from '@utils/getValidationErrors';
import * as Yup from 'yup';

import { Container, Title, Form, Header, ButtonSubmit, P } from './styles';

interface ISubmitForm {
  cpf_cnpj: string;
}
const RecoveryPassword: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = React.useCallback(async (data: ISubmitForm) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      const { cpf_cnpj } = data;
      setLoading(true);
      try {
        const response = await api.post('/sessao/fornecedor/reset_senha', {
          cpf_cnpj,
        });
        console.log(response.data);
        Alert.alert('Verifique seu email', response.data.message);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.message === 'Network Error') {
          Alert.alert('Verifique sua conexão de internet e tente novamente!!');
        } else {
          console.log(JSON.stringify(error, null, 2));
          console.log(error, 'jonathan');
          console.log(Object(error.response), 'salve');
          Alert.alert(error.response.data.error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        }
      }
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
            Por favor, insira o CPF/CNPJ da sua conta para receber a sua nova
            senha no email cadastrado.
          </P>
        </Header>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <Form>
            <Input
              icon="info"
              label="CPF/CNPJ"
              name="cpf_cnpj"
              placeholder="CPF/CNPJ associado a sua conta"
              autoCapitalize="none"
              returnKeyType="next"
              containerStyle={{
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
