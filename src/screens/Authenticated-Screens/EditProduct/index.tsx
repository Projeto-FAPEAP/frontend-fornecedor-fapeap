import React from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';

import Input from '@components/Input';
import KeyboardView from '@components/KeyboardView';
import { useAuth } from '@contexts/auth';
import { useProducts } from '@contexts/product';
import { useRoute } from '@react-navigation/native';
import api from '@services/api';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import getValidationErrors from '@utils/getValidationErrors';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import * as S from './styles';

type IAvailability = 'Disponível' | 'Indisponivel';

interface IParams {
  itemId: string;
}

interface IResponseProduct {
  id: string;
  status_produto: boolean;
  nome: string;
  preco: string;
}

interface ISubmit {
  nome: string;
  preco: string;
  status_produto: string;
  unidade_medida: string;
}

const EditProduct: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const { params } = useRoute();
  const [loading, setLoading] = React.useState(true);
  const { colors } = useTheme();
  const { user } = useAuth();
  const { getAllProducts } = useProducts();

  const routeParams = params as IParams;

  React.useEffect(() => {
    if (!routeParams.itemId || !user || !formRef) return;

    api
      .get<IResponseProduct>(`/produto/${user.id}/${routeParams.itemId}`)
      .then((response) => {
        const { nome, preco, status_produto } = response.data;

        formRef.current?.setData({
          nome,
          preco: `R$ ${preco}`,
          status_produto: status_produto ? 'Disponivel' : 'Indisponivel',
          unidade_medida: 'Litro',
        });

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [routeParams.itemId, user]);

  const handleSubmit = React.useCallback(
    async (values: ISubmit) => {
      setLoading(true);
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome é obrigatório'),
          preco: Yup.string()
            .test(
              'price',
              'Você precisa declarar um valor para o produto',
              (value: string) => {
                try {
                  const price = value.split('R$ ')[1];
                  if (Number(price) > 0) return true;

                  return false;
                } catch {
                  return false;
                }
              },
            )
            .required('Valor é obrigatório'),
          status_produto: Yup.string().required(
            'Estatus do produto é obrigatório',
          ),
          unidade_medida: Yup.string().required(
            'Unidade de medida do produto é obrigatória',
          ),
        });

        await schema.validate(values, { abortEarly: false });

        const { nome, preco, status_produto, unidade_medida } = values;

        const formattedPrice = preco.split('R$ ')[1];

        await api.put(`/produto/${routeParams.itemId}`, {
          nome,
          preco: formattedPrice,
          status_produto: status_produto === 'Disponivel',
          unidade_medida,
        });
        getAllProducts();
        Alert.alert(
          'Tudo certo',
          'As informações do produto foram atualizadas',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        console.log(JSON.stringify(err, null, 2));
      }
      setLoading(false);
    },
    [routeParams.itemId, getAllProducts],
  );

  const handleChangeAvailability = React.useCallback((value) => {
    const option = value as IAvailability;
    formRef.current?.setFieldValue('status_produto', option);
  }, []);

  const handleChangeMeasure = React.useCallback((value: string) => {
    formRef.current?.setFieldValue('unidade_medida', value);
  }, []);

  return (
    <KeyboardView>
      <S.Container>
        <S.Title>Você só precisa alterar o necessário</S.Title>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <S.Form>
            <Input
              icon="edit"
              label="Nome do produto"
              name="nome"
              placeholder="Nome do produto"
              autoCapitalize="none"
              returnKeyType="next"
              containerStyle={{
                maxWidth: 400,
              }}
            />

            <Input
              icon="dollar-sign"
              label="Preço do produto"
              name="preco"
              placeholder="Preço do produto"
              autoCapitalize="none"
              keyboardType="number-pad"
              autoCorrect={false}
              returnKeyType="next"
              containerStyle={{
                marginTop: 15,
                maxWidth: 400,
              }}
              onChangeText={(text) => {
                const formatted = MaskService.toMask('money', text, {
                  precision: 2,
                  separator: '.',
                  delimiter: ',',
                  unit: 'R$ ',
                  suffixUnit: '',
                });

                formRef.current?.setFieldValue('preco', formatted);
              }}
            />
            <RNPickerSelect
              onValueChange={handleChangeAvailability}
              placeholder={{
                label: 'Selecione a disponibilidade do produto',
                displayValue: false,
              }}
              items={[
                { label: 'Disponível', value: 'Disponível' },
                { label: 'Indisponível', value: 'Indisponível' },
              ]}
            >
              <Input
                icon="alert-circle"
                label="Disponibilidade"
                name="status_produto"
                placeholder="Selecione a disponibilidade do produto"
                autoCapitalize="none"
                keyboardType="number-pad"
                autoCorrect={false}
                returnKeyType="next"
                containerStyle={{
                  marginTop: 15,
                  maxWidth: 400,
                }}
              />
            </RNPickerSelect>

            <RNPickerSelect
              onValueChange={handleChangeMeasure}
              placeholder={{
                label: 'Selecione a unidade de medida',
                displayValue: false,
              }}
              items={[
                {
                  label: '1 Quilograma (kg)',
                  value: 'Quilograma',
                },
                { label: '1 Litro (l)', value: 'Litro' },
                { label: '500 Gramas (g)', value: 'Gramas' },
                { label: '500 Mililitros (ml)', value: 'Mililitros' },
              ]}
            >
              <Input
                placeholder="Selecione a unidade de medida"
                icon="box"
                label="Unidade de medida"
                name="unidade_medida"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                containerStyle={{
                  marginTop: 15,
                  maxWidth: 400,
                }}
              />
            </RNPickerSelect>
          </S.Form>
          <S.Actions>
            <S.ButtonDelete loading={loading} colorText={colors.danger}>
              Excluir
            </S.ButtonDelete>
            <S.ButtonSubmit
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Atualizar
            </S.ButtonSubmit>
          </S.Actions>
        </FormProvider>
      </S.Container>
    </KeyboardView>
  );
};

export default EditProduct;
