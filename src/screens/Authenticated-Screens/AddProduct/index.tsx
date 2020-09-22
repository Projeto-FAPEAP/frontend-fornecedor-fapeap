import React from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaskService } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';

import ButtonPhoto from '@components/ButtonPhoto';
import Input from '@components/Input';
import KeyboardView from '@components/KeyboardView';
import { useProducts } from '@contexts/product';
import SelectPhoto from '@libs/SelectPhoto';
import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import getValidationErrors from '@utils/getValidationErrors';
import * as Yup from 'yup';

import * as S from './styles';

type IAvailability = 'Disponível' | 'Indisponivel';

interface ISubmit {
  nome: string;
  preco: string;
  status_produto: string;
  unidade_medida: string;
  estoque_produto: string;
}

interface IFile {
  id: string;
  url: string;
  isFilled: boolean;
  data?: {
    type?: string;
    size: number;
    name: string;
    uri: string;
    fileCopyUri: string;
  };
}

const AddProduct: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const [loading, setLoading] = React.useState(false);
  const { goBack } = useNavigation();
  const { getAllProducts, addProduct } = useProducts();
  const [files, setFiles] = React.useState<IFile[]>([{}, {}]);

  /*  React.useEffect(() => {
    return () => {
      getAllProducts();
    };
  }, [getAllProducts]); */

  const handleSubmit = React.useCallback(
    async (values: ISubmit) => {
      setLoading(true);
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome é obrigatório'),
          estoque_produto: Yup.string().required('Estoque é obrigatório'),
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
        const { estoque_produto } = values;

        const formattedPrice = preco.split('R$ ')[1];

        const filterImages = files.filter((file) => file.isFilled);

        if (filterImages.length === 0) {
          Alert.alert(
            'Atenção',
            'Você precisa selecionar pelo menos uma imagem',
          );
          setLoading(false);
          return;
        }

        const formData = new FormData();

        filterImages.forEach((file) => {
          formData.append('file', file.data);
        });

        formData.append('nome', nome);
        formData.append('preco', formattedPrice);
        formData.append('estoque_produto', estoque_produto);
        formData.append('status_produto', status_produto === 'Disponível');
        formData.append('unidade_medida', unidade_medida);

        const response = await api.post(`/produto`, formData);
        addProduct(response.data);
        Alert.alert('Tudo certo', 'Produto cadastrado com sucesso');
        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
      setLoading(false);
    },
    [files, goBack],
  );

  const handleChangeAvailability = React.useCallback((value) => {
    const option = value as IAvailability;
    formRef.current?.setFieldValue('status_produto', option);
  }, []);

  const handleChangeMeasure = React.useCallback((value: string) => {
    formRef.current?.setFieldValue('unidade_medida', value);
  }, []);

  const handleSaveImage = React.useCallback(async (idx: number) => {
    const photo = await SelectPhoto();

    if (!photo) return;

    const { type, fileSize, fileName, uri } = photo;

    const formattedFile = {
      type,
      size: fileSize,
      name: fileName || `${Date.now()}.png`,
      uri,
      fileCopyUri: uri,
    };

    setFiles((state) =>
      state.map((findFile, index) =>
        index === idx
          ? { isFilled: true, id: uri, url: uri, data: formattedFile }
          : findFile,
      ),
    );
  }, []);

  const handleDeleteImage = React.useCallback(async (idx: number) => {
    setFiles((state) =>
      state.map((findFile, index) =>
        index === idx ? { isFilled: false, id: '', url: '' } : findFile,
      ),
    );
  }, []);

  const handleConfirmDelete = React.useCallback(
    (idx: number) => {
      Alert.alert(
        'Confirme para continuar',
        'Deseja confimar a exlusão desta imagem?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          { text: 'Sim, delete!', onPress: () => handleDeleteImage(idx) },
        ],
        { cancelable: false },
      );
    },
    [handleDeleteImage],
  );

  function getSize(): number {
    let k = 0;
    files.forEach((filess) => {
      if (filess.isFilled) {
        k += 1;
      }
    });
    console.log(k, 'joantnn');
    return k;
  }

  return (
    <KeyboardAwareScrollView>
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
            <Input
              icon="package"
              label="Quantidade em estoque"
              name="estoque_produto"
              placeholder="Quantidade em estoque"
              autoCapitalize="none"
              keyboardType="number-pad"
              autoCorrect={false}
              returnKeyType="next"
              containerStyle={{
                marginTop: 15,
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
                }}
              />
            </RNPickerSelect>
          </S.Form>

          <S.Title>Fotos do produto (até 2 fotos)</S.Title>

          <S.ContentPhotos>
            {files.map((file, idx) => (
              <ButtonPhoto
                size={getSize()}
                key={`${file.id}-${idx}`}
                url={file.url}
                style={idx > 0 ? { marginLeft: 10 } : {}}
                onPress={() => handleSaveImage(idx)}
                onRemove={() => handleConfirmDelete(idx)}
              />
            ))}
          </S.ContentPhotos>

          <S.Actions>
            <S.ButtonSubmit
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Cadastrar
            </S.ButtonSubmit>
          </S.Actions>
        </FormProvider>
      </S.Container>
    </KeyboardAwareScrollView>
  );
};

export default AddProduct;
