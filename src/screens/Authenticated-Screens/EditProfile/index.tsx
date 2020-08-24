import React from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaskService } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';

import ButtonPhoto from '@components/ButtonPhoto';
import Input from '@components/Input';
import KeyboardView from '@components/KeyboardView';
import { useAuth } from '@contexts/auth';
import { useProducts } from '@contexts/product';
import SelectPhoto from '@libs/SelectPhoto';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import getValidationErrors from '@utils/getValidationErrors';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import Loader from '../../utils/index';
import * as S from './styles';

interface ISubmit {
  telefone_whatsapp: string;
  telefone: string;
  senhaAtual: string;
  senha: string;
  password_confirmation: string;
}

interface IResponse {
  telefone_whatsapp: string;
  telefone: string;
  senha: string;
}

const EditProfile: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();
  const navigation = useNavigation();

  React.useEffect(() => {
    try {
      api
        .get(`${api.defaults.baseURL}/fornecedor/${user?.id}`)
        .then((response) => {
          formRef.current?.setData({
            telefone_whatsapp: response.data.telefone_whatsapp,
            telefone: response.data.telefone,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  }, []);

  async function getFornecedor(): Promise<void> {
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/${user?.id}`,
      );
      setLoading(false);
      formRef.current?.setData({
        telefone_whatsapp: response.data.telefone_whatsapp,
        telefone: response.data.telefone,
      });
      console.log(response.data.telefone_whatsapp);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handleSubmit = React.useCallback(
    async (values: ISubmit) => {
      console.log('fdfddddddd');
      setLoading(true);
      formRef.current?.setErrors({});
      try {
        /*  if (telefone_whatsapp === '' || telefone === '') {
          console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
          const schema = Yup.object().shape({
            telefone_whatsapp: Yup.string().required(
              'Telefone whatsapp é obrigatório',
            ),
            telefone: Yup.string().required('Telefone é obrigatório'),
          });
          await schema.validate(
            { telefone_whatsapp, telefone },
            {
              abortEarly: false,
            },
          );
        } */
        /*       if (senha !== '' || senhaAtual !== '' || password_confirmation !== '') {
          console.log('apapppppppppppppppp'); */
        const schema = Yup.object().shape({
          telefone_whatsapp: Yup.string().required(
            'Telefone whatsapp é obrigatório',
          ),
          telefone: Yup.string().required('Telefone é obrigatório'),

          senha: Yup.string(),
          password_confirmation: Yup.string()
            .when('senha', {
              is: (val) => !!val.length,
              then: Yup.string()
                .required('Campo obrigatório')
                .min(5, 'No mínimo 5 caracteres!'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('senha'), ''], 'Confirmação incorreta'),
          senhaAtual: Yup.string().required('Campo obrigatório'),

          /* senhaAtual: Yup.string().when('oldPassword', {
              is: (val) => !!val.length,
              then: Yup.string()
                .required('Campo obrigatório')
                .min(5, 'No mínimo 5 caracteres!'),
              otherwise: Yup.string(),
            }),
            senhaAtual: Yup.string().required('Senha Atual é obrigatório'),
            senha: Yup.string()
              .min(3, 'Você deve informar no mínimo 4 caracteres')
              .required('Senha é obrigatória'),
            password_confirmation: Yup.string()
              .oneOf([Yup.ref('senha')], 'Senhas não coincidem')
              .required('A confirmação da senha é obrigatória'), */
        });
        await schema.validate(values, {
          abortEarly: false,
        });
        const {
          telefone_whatsapp,
          telefone,
          senha,
          senhaAtual,
          password_confirmation,
        } = values;
        /*    } */
        try {
          await api.put(`/fornecedor/`, {
            telefone_whatsapp,
            telefone,
            senhaAtual,
            senha,
          });

          Alert.alert(
            'Tudo certo',
            'As Informações do Perfil Foram Atualizadas!!',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Index'),
                style: 'default',
              },
            ],
          );
        } catch (error) {
          console.log(JSON.stringify(error, null, 2));
          console.log(error, 'jonathan');
          console.log(Object(error.response), 'salve');
          Alert.alert('Erro encontrado', error.response.data.error);
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
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log(JSON.stringify(err, null, 2));

          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
      setLoading(false);
    },
    [user.id],
  );

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      {/*    {!loading ? ( */}
      <S.Container>
        <S.Title>Você só precisa alterar o necessário</S.Title>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <S.Form>
            <Input
              containerStyle={{
                marginTop: 5,
                maxWidth: 350,
              }}
              icon="message-circle"
              label="Telefone whatsapp"
              name="telefone_whatsapp"
              placeholder="Telefone whatsapp"
              keyboardType="number-pad"
              onChangeText={(text) => {
                const formatted = MaskService.toMask('cel-phone', text, {
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                });
                formRef.current?.setFieldValue('telefone_whatsapp', formatted);
              }}
            />

            <Input
              containerStyle={{
                marginTop: 15,
                maxWidth: 350,
              }}
              icon="phone"
              label="Telefone para contato"
              name="telefone"
              placeholder="Telefone para contato"
              keyboardType="number-pad"
              onChangeText={(text) => {
                const formatted = MaskService.toMask('cel-phone', text, {
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                });
                formRef.current?.setFieldValue('telefone', formatted);
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
              placeholder="Sua nova senha"
              secureTextEntry
            />

            <Input
              containerStyle={{
                marginTop: 15,
                maxWidth: 350,
              }}
              icon="lock"
              label="Confirmar senha"
              name="password_confirmation"
              placeholder="Confirme sua nova senha"
              secureTextEntry
            />
            <S.Line />
            <Input
              containerStyle={{
                marginTop: 15,
                maxWidth: 350,
              }}
              icon="lock"
              label="Senha Atual"
              name="senhaAtual"
              placeholder="Sua senha atual"
              secureTextEntry
            />
          </S.Form>

          <S.ButtonSubmit
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            Atualizar
          </S.ButtonSubmit>
        </FormProvider>
      </S.Container>
      {/*  ) : (
        <Loader loading={loading} />
      )} */}
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;
