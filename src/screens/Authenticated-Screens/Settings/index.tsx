import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MediaMeta from 'react-native-media-meta';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

import ButtonPhoto from '@components/ButtonPhoto';
import { useAuth } from '@contexts/auth';
import SelectPhoto from '@libs/SelectPhoto';
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api';
import Loader from '../../utils';
import { CardItem } from '../History/CardHistoryItem/styles';
import {
  Container,
  Form,
  Header,
  RegisterButton,
  RegularText,
  RegisterButtonText,
  P,
  MediaSpotButton,
  WrapperList,
  AddMediaButtonWrapper,
  RemoveMediaButtonWrapper,
  MediaWrapper,
  RemoveMedia,
  MainTitle,
  ContentPhotos,
} from './styles';

interface IFile {
  id: string;
  url: string;
  isFilled: boolean;
  arquivo_tipo: string;
}

interface IReponseFile {
  arquivos: {
    id: string;
    url: string;
  }[];
}

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const [extraPhoto, setExtraPhoto] = useState(false);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const [photoList, setPhotoList] = useState<ImagePickerResponse[]>([]);
  const [videoState, setVideoState] = useState<ImagePickerResponse[]>([]);
  const [videoSelected, setVideoSelected] = useState(false);
  const [learning, setLearning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = React.useState<IFile[]>([{}, {}, {}, {}, {}]);
  const { user } = useAuth();

  useEffect(() => {
    getFornecedor();
  }, []);

  function removePhoto(index: number): void {
    // Alert.alert('Jonathan');
    Alert.alert(
      'Remover foto',
      'Quer mesmo remover?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const oldPhotosList = photoList;
            const newPhotoList = [];
            let j = 0;
            for (let i = 0; i < photoList.length; i += 1) {
              if (i !== index) {
                newPhotoList[j] = oldPhotosList[i];
                j += 1;
              }
            }

            setPhotoList(newPhotoList);
            Alert.alert('Removido com Sucesso!');
          },
        },
      ],
      { cancelable: false },
    );
  }

  function learn(): void {
    setTimeout(function () {
      setLearning(false);
    }, 5000);
  }

  function handleChoosePhoto(): void {
    // Alert.alert('Jonathan');
    if (photoList.length < 5) {
      const photos = photoList;
      let Repeat = false;
      const options = {};
      ImagePicker.launchImageLibrary(options, (Response) => {
        if (Response.uri) {
          for (let i = 0; i < photoList.length; i += 1) {
            if (String(photos[i].uri) === Response.uri) {
              Repeat = true;
            }
          }

          if (Repeat) {
            Alert.alert(
              'Aviso',
              'Você já adicionou essa imagem, evite adicionar imagens repetidas!',
            );
          } else {
            photos.push(Object(Response));

            setPhotoList(photos);
            setExtraPhoto(true);
            setLearning(true);
            learn();
            Alert.alert('Adicionado com Sucesso!');
            setExtraPhoto(false);
          }
        }
      });
    } else {
      Alert.alert(
        'Aviso',
        'Você chegou ao limite de fotos inseridas, caso queira adicionar novas, exclua alguma!',
      );
    }
  }

  function handleChooseVideo(): void {
    const options = {
      mediaType: 'video',
    };

    ImagePicker.launchImageLibrary(
      options as ImagePickerOptions,
      (response) => {
        if (response.uri) {
          MediaMeta.get(response.path)
            .then((metadata) => {
              if (metadata.duration <= 60000) {
                setVideo(response);

                setVideo(response.uri);
                setVideoSelected(true);
                Alert.alert('Adicionado com Sucesso!');
              } else {
                Alert.alert(
                  'Aviso',
                  'O video escolhido possui mais de 1 minuto de duração, escolha outro com até 1 minuto de duração! ',
                );
              }
            })
            .catch((err: string) => console.error(err));
        }
      },
    );
  }
  function removeVideo(): void {
    // Alert.alert('Jonathan');
    Alert.alert(
      'Remover Video',
      'Quer mesmo remover?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setVideo({});
            setVideoSelected(false);
            Alert.alert('Removido com Sucesso!');
          },
        },
      ],
      { cancelable: false },
    );
  }

  function isEmpty(obj: object): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const handleSaveImage = React.useCallback(
    async (file: IFile, idx: number) => {
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
        } else {
          const { data } = await api.post<IReponseFile[]>(
            `/arquivoproduto/${user.id}`,
            formData,
          );

          setFiles((state) =>
            state.map((findFile, index) =>
              index === idx
                ? { isFilled: true, id: data[0].id, url: data[0].url }
                : findFile,
            ),
          );
        }
        Toast.show('Foto atualizada', Toast.SHORT, ['UIAlertController']);
      } catch (err) {
        Toast.show('Ocorreu um erro ao atualizar', Toast.SHORT, [
          'UIAlertController',
        ]);
      }
    },
    [user.id],
  );

  async function getFornecedor(): Promise<void> {
    console.log('dfdf');
    setLoading(true);

    api
      .get<IReponseFile>(`${api.defaults.baseURL}/fornecedor/${user?.id}`)
      .then((response) => {
        const { arquivos } = response.data;
        const responseFiles = Array.from({ length: 5 }, (_v, k) => {
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

    setLoading(false);
    /* console.log(JSON.stringify(response.data, null, 2)); */
    console.log('fdllllll');
  }

  const handleDeleteImage = React.useCallback(async (file: IFile) => {
    try {
      await api.delete(`/arquivoproduto/${file.id}`);

      setFiles((state) =>
        state.map((findFile) =>
          findFile.id === file.id
            ? { isFilled: false, url: '', id: '' }
            : findFile,
        ),
      );
      Toast.show('Foto excluída', Toast.SHORT, ['UIAlertController']);
    } catch {
      Toast.show('Ocorreu um erro ao deletar', Toast.SHORT, [
        'UIAlertController',
      ]);
    }
  }, []);

  const handleConfirmDelete = React.useCallback(
    (file: IFile) => {
      Alert.alert(
        'Confirme para continuar',
        'Deseja confimar a exlusão desta imagem?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          { text: 'Sim, delete!', onPress: () => handleDeleteImage(file) },
        ],
        { cancelable: false },
      );
    },
    [handleDeleteImage],
  );

  return (
    <Container>
      {!loading ? (
        <KeyboardAwareScrollView>
          <Form>
            <MainTitle>Fotos (até 4 fotos)</MainTitle>

            <ContentPhotos>
              <FlatList
                horizontal
                data={files}
                renderItem={({ item, index }) => (
                  <ButtonPhoto
                    url={item.url}
                    style={index > 0 ? { marginLeft: 10 } : {}}
                    onPress={() => handleSaveImage(item, index)}
                    onRemove={() => handleConfirmDelete(item)}
                  />
                )}
                keyExtractor={(item, index) => String(index)}
              />
            </ContentPhotos>
            <MainTitle>Vídeo (até 1 minuto) </MainTitle>

            {videoSelected ? (
              <MediaWrapper>
                {!isEmpty(videoState) ? (
                  <Video
                    source={{ uri: videoState[0].uri }}
                    style={{
                      width: '100%',
                      height: '100%',

                      position: 'absolute',
                    }}
                    poster={videoState[0].uri}
                    resizeMode="contain"
                    controls
                  />
                ) : null}
                <RemoveMedia onPress={() => removeVideo()}>
                  <Icon color="#EA3232" size={35} name="trash-o" />
                </RemoveMedia>
              </MediaWrapper>
            ) : (
              <MediaSpotButton onPress={() => handleChooseVideo()}>
                <AddMediaButtonWrapper>
                  <Icon color="#84378F" size={35} name="plus" />
                </AddMediaButtonWrapper>
              </MediaSpotButton>
            )}

            <RegisterButton loading={loading}>
              <RegisterButtonText>Atualizar dados</RegisterButtonText>
            </RegisterButton>
          </Form>
        </KeyboardAwareScrollView>
      ) : (
        <Loader loading={loading} />
      )}
    </Container>
  );
};

export default Settings;
