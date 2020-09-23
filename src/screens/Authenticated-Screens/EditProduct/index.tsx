import React from 'react';
import { Alert } from 'react-native';
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

import * as S from './styles';

type IAvailability = 'Disponível' | 'Indisponivel';

interface IParams {
  itemId: string;
}

interface IReponseFile {
  id: string;
  url: string;
}

interface IResponseProduct {
  id: string;
  status_produto: boolean;
  nome: string;
  preco: string;
  unidade_medida: string;
  estoque_produto: string;
  arquivos: {
    id: string;
    url: string;
  }[];
}

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
}

const EditProduct: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const { params } = useRoute();
  const [loading, setLoading] = React.useState(true);
  const { colors } = useTheme();
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();
  const {
    getAllProducts,
    editProduct,
    productList,
    removeProduct,
    editProductMedia,
  } = useProducts();
  const [files, setFiles] = React.useState<IFile[]>([]);

  const routeParams = params as IParams;

  React.useEffect(() => {
    if (!routeParams.itemId || !user || !formRef) return;

    api
      .get<IResponseProduct>(`/produto/${user.id}/${routeParams.itemId}`)
      .then((response) => {
        const {
          nome,
          preco,
          status_produto,
          arquivos,
          estoque_produto,
          unidade_medida,
        } = response.data;

        formRef.current?.setData({
          nome,
          preco: `R$ ${preco}`,
          status_produto: status_produto ? 'Disponível' : 'Indisponivel',
          unidade_medida,
          estoque_produto: String(estoque_produto),
        });
        console.log(response.data);
        const responseFiles = Array.from({ length: 2 }, (_v, k) => {
          try {
            return {
              id: arquivos[k].id,
              url: arquivos[k].url,
              isFilled: true,
            };
          } catch (error) {
            return {
              id: '',
              url: '',
              isFilled: false,
            };
          }
        });

        setFiles(responseFiles);
        console.log(responseFiles);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [routeParams.itemId, user]);

  /* React.useEffect(() => {
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
        console.log(status_produto, 'trrrrrrrrrrrrr');
        const response = await api.put(`/produto/${routeParams.itemId}`, {
          nome,
          preco: formattedPrice,
          status_produto: status_produto === 'Disponível',
          unidade_medida,
          estoque_produto,
        });
        editProduct(response.data);
        console.log(JSON.stringify(productList, null, 2), 'hjhjhjhg');
        Alert.alert(
          'Tudo certo',
          'As informações do produto foram atualizadas',
          [
            {
              text: 'Ok',
              onPress: () => navigate('Index'),
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
    [routeParams.itemId],
  );

  const handleDelete = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/produto/${routeParams.itemId}`);
      removeProduct(routeParams.itemId);
      Alert.alert('Tudo certo', 'Produto excluído com sucesso');
      goBack();
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

    setLoading(false);
  }, [routeParams.itemId, goBack]);

  const handleChangeAvailability = React.useCallback((value) => {
    const option = value as IAvailability;
    formRef.current?.setFieldValue('status_produto', option);
  }, []);

  const handleChangeMeasure = React.useCallback((value: string) => {
    formRef.current?.setFieldValue('unidade_medida', value);
  }, []);

  const handleSaveImage = React.useCallback(
    async (file: IFile, idx: number, nextFile: IFile) => {
      const photo = await SelectPhoto();

      if (!photo) return;

      Toast.show('Efetuando o upload...', Toast.SHORT, ['UIAlertController']);

      const { type, fileSize, fileName, uri } = photo;

      const isUpdate = file.isFilled;
      const formattedFile = {
        type,
        size: fileSize,
        name: fileName || `${Date.now()}.png`,
        uri,
        fileCopyUri: uri,
      };

      const formData = new FormData();

      formData.append('file', formattedFile);

      try {
        if (isUpdate) {
          const { data } = await api.put<IReponseFile>(
            `/arquivoproduto/${file.id}`,
            formData,
          );
          setFiles((state) =>
            state.map((findFile) =>
              findFile.id === file.id
                ? { isFilled: true, id: data.id, url: data.url }
                : findFile,
            ),
          );
          if (idx === 0) {
            console.log('esquerda mudando', data.url);
            editProductMedia(data.url, routeParams.itemId);
          } else if (idx === 1) {
            console.log('direita mudando');
            editProductMedia(data.url, routeParams.itemId);
          }
        } else {
          const { data } = await api.post<IReponseFile[]>(
            `/arquivoproduto/${routeParams.itemId}`,
            formData,
          );

          setFiles((state) =>
            state.map((findFile, index) =>
              index === idx
                ? { isFilled: true, id: data[0].id, url: data[0].url }
                : findFile,
            ),
          );

          if (idx === 0) {
            console.log('esquerda mudando', data[0].url);
            editProductMedia(data[0].url, routeParams.itemId);
          } else if (idx === 1) {
            console.log('direita mudando');
            editProductMedia(data[0].url, routeParams.itemId);
          }
        }

        Toast.show('Foto atualizada', Toast.SHORT, ['UIAlertController']);
      } catch (err) {
        Toast.show('Ocorreu um erro ao atualizar', Toast.SHORT, [
          'UIAlertController',
        ]);
      }
    },
    [routeParams.itemId],
  );

  const handleDeleteImage = React.useCallback(
    async (file: IFile, nextFile: IFile) => {
      try {
        await api.delete(`/arquivoproduto/${file.id}`);

        setFiles((state) =>
          state.map((findFile) =>
            findFile.id === file.id
              ? { isFilled: false, url: '', id: '' }
              : findFile,
          ),
        );
        console.log('alllllllllll');
        console.log(nextFile.url, 'jjjnhhhhhhh');
        editProductMedia(nextFile.url, routeParams.itemId);
        Toast.show('Foto excluída', Toast.SHORT, ['UIAlertController']);
      } catch {
        Toast.show('Ocorreu um erro ao deletar', Toast.SHORT, [
          'UIAlertController',
        ]);
      }
    },
    [],
  );

  const handleConfirmDelete = React.useCallback(
    (file: IFile, nextFile: IFile) => {
      console.log('teste');
      Alert.alert(
        'Confirme para continuar',
        'Deseja confimar a exlusão desta imagem?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Sim, delete!',
            onPress: () => handleDeleteImage(file, nextFile),
          },
        ],
        { cancelable: false },
      );
    },
    [handleDeleteImage],
  );

  const handleConfirmDeleteProduct = React.useCallback(() => {
    Alert.alert(
      'Confirme para continuar',
      'Deseja confimar a exlusão deste produto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim, delete!', onPress: handleDelete },
      ],
      { cancelable: false },
    );
  }, [handleDelete]);

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
            {files.map((file, idx, elements) => (
              <ButtonPhoto
                size={getSize()}
                key={`${file.id}-${idx}`}
                url={file.url}
                style={idx > 0 ? { marginLeft: 10 } : {}}
                onPress={() =>
                  handleSaveImage(
                    file,
                    idx,
                    idx > 0 ? elements[0] : elements[idx + 1],
                  )
                }
                onRemove={() =>
                  handleConfirmDelete(
                    file,
                    idx > 0 ? elements[0] : elements[idx + 1],
                  )
                }
              />
            ))}
          </S.ContentPhotos>

          <S.Actions>
            <S.ButtonDelete
              loading={loading}
              colorText={colors.danger}
              onPress={handleConfirmDeleteProduct}
            >
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
    </KeyboardAwareScrollView>
  );
};

export default EditProduct;
