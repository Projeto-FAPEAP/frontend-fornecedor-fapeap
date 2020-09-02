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

type IAvailability = 'Disponível' | 'Indisponivel';
interface ISubmit {
  status_delivery: string;
  preco: string;
}

interface IResponse {
  telefone_whatsapp: string;
  telefone: string;
  senha: string;
}

const EditDelivery: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();
  const navigation = useNavigation();
  const [delivery, setDelivery] = React.useState(true);
  const [wasChanged, setWasChanged] = React.useState(false);
  React.useEffect(() => {
    try {
      api
        .get(`${api.defaults.baseURL}/fornecedor/${user?.id}`)
        .then((response) => {
          if (response.data.taxa_delivery !== null) {
            setDelivery(true);
            formRef.current?.setData({
              status_delivery: 'Sim',
              preco: response.data.taxa_delivery,
            });
            console.log(response.data.taxa_delivery);
          } else {
            setDelivery(false);
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  }, [user?.id]);

  const handleSubmit = React.useCallback(
    async (values: ISubmit) => {
      console.log('fdfddddddd');
      setLoading(true);
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          status_delivery: Yup.string().required('Selecione uma opção'),
          preco: Yup.string().when('status_delivery', {
            is: 'Sim',
            then: Yup.string().required('Campo obrigatório'),

            otherwise: Yup.string(),
          }),
        });
        await schema.validate(values, {
          abortEarly: false,
        });
        const { status_delivery, preco } = values;

        console.log('SLCAAAAAAAA');
        /*    } */
        try {
          console.log('SLCAAAAAAAA');
          if (status_delivery !== 'Não') {
            const formattedPrice = preco.split('R$ ')[1];
            await api.put(`/fornecedor/`, {
              taxa_delivery: formattedPrice,
            });
          } else {
            console.log('SLCAAAAAAAA');
            await api.put(`/fornecedor/`, {
              taxa_delivery: null,
            });
          }

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
          Alert.alert('Ocorreu um erro', error.response.data.error);
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

  const handleChangeAvailability = React.useCallback((value) => {
    const option = value as IAvailability;
    setWasChanged(true);
    formRef.current?.setFieldValue('status_delivery', option);
    if (value === 'Sim') {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  }, []);

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <S.Container>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <S.Form>
            <RNPickerSelect
              onValueChange={handleChangeAvailability}
              placeholder={{
                label: ' Selecione uma opção',
                displayValue: false,
              }}
              items={[
                { label: 'Sim, faço entregas', value: 'Sim' },
                { label: 'Não', value: 'Não' },
              ]}
            >
              <Input
                icon="alert-circle"
                label="Faz Entregas?"
                name="status_delivery"
                placeholder="Seu estabelecimento faz entregas?"
                autoCapitalize="none"
                keyboardType="number-pad"
                autoCorrect={false}
                returnKeyType="next"
                containerStyle={{
                  marginTop: 15,
                  minWidth: 350,
                }}
              />
            </RNPickerSelect>
            {delivery ? (
              <Input
                icon="dollar-sign"
                label="Preço do Entrega"
                name="preco"
                placeholder="Preço da Entrega"
                autoCapitalize="none"
                keyboardType="number-pad"
                autoCorrect={false}
                returnKeyType="next"
                containerStyle={{
                  marginTop: 15,
                  maxWidth: 350,
                }}
                onChangeText={(text) => {
                  const formatted = MaskService.toMask('money', text, {
                    precision: 2,
                    separator: '.',
                    delimiter: ',',
                    unit: 'R$ ',
                    suffixUnit: '',
                  });
                  setWasChanged(true);
                  formRef.current?.setFieldValue('preco', formatted);
                }}
              />
            ) : null}
          </S.Form>

          {wasChanged ? (
            <S.ButtonSubmit
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Atualizar
            </S.ButtonSubmit>
          ) : null}
        </FormProvider>
      </S.Container>
    </KeyboardAwareScrollView>
  );
};

export default EditDelivery;
