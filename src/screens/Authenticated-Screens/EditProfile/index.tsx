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
  senha: string;
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
        const { telefone_whatsapp, telefone, senha } = values;

        await api.put(`/fornecedor/`, {
          telefone_whatsapp,
          telefone,
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
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
      setLoading(false);
    },
    [user.id],
  );

  return (
    <View style={{ flex: 1 }}>
      {!loading ? (
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
                returnKeyType="send"
                onChangeText={(text) => {
                  const formatted = MaskService.toMask('cel-phone', text, {
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  });
                  formRef.current?.setFieldValue(
                    'telefone_whatsapp',
                    formatted,
                  );
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
                returnKeyType="next"
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
                placeholder="Sua senha secreta"
                secureTextEntry
                returnKeyType="next"
              />

              <Input
                containerStyle={{
                  marginTop: 15,
                  maxWidth: 350,
                }}
                icon="lock"
                label="Confirmar senha"
                name="password_confirmation"
                placeholder="Confirme sua senha"
                secureTextEntry
                returnKeyType="send"
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
      ) : (
        <Loader loading={loading} />
      )}
    </View>
  );
};

export default EditProfile;
