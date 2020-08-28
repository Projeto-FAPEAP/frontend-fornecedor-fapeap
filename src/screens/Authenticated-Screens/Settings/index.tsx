import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
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
import VideoPlayer from 'react-native-video-controls';

import ButtonPhoto from '@components/ButtonPhoto';
import ButtonVideo from '@components/ButtonVideo';
import { useAuth } from '@contexts/auth';
import SelectDocument from '@libs/SelectDocument';
import SelectPhoto from '@libs/SelectPhoto';
import { useNavigation } from '@react-navigation/native';
import { ka } from 'date-fns/locale';
import { useTheme } from 'styled-components';

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
  ContentVideo,
  VideoWrapper,
  VideoProps,
  VideoPropsButton,
  VideoPropsText,
  VideoPropsTextWrapper,
} from './styles';

interface IFile {
  id: string;
  url: string;
  isFilled: boolean;
}

interface IVideo {
  id: string;
  url: string;
  nome_original: string;
}

/* interface IReponseFile {
  arquivos: {
    id: string;
    url: string;
    arquivo_tipo: string;
    nome_original: string;
  }[];
} */

interface IReponseFile {
  id: string;
  url: string;
  arquivos: {
    id: string;
    url: string;
    arquivo_tipo: string;
    nome_original: string;
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
  const [files, setFiles] = React.useState<IFile[]>([
    /* {}, {}, {}, {}, {} */
  ]);
  const [video, setVideo] = React.useState<IVideo>();
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const { user } = useAuth();
  const { colors } = useTheme();
  useEffect(() => {
    getFornecedor();
  }, []);

  /*  function removePhoto(index: number): void {
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
  } */

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
          console.log('atualçi');
          const { data } = await api.put<IReponseFile>(
            `/arqfornecedor/imagem/${file.id}`,
            formData,
          );
          console.log(data.id, data.url);
          setFiles((state) =>
            state.map((findFile) =>
              findFile.id === file.id
                ? { isFilled: true, id: data.id, url: data.url }
                : findFile,
            ),
          );
        } else {
          console.log('kkiidididi');
          const { data } = await api.post<IReponseFile[]>(
            `/arqfornecedor/`,
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
        console.log(JSON.stringify(err, null, 2));
        console.log(err, 'jonathan');
        console.log(Object(err.response), 'salve');
        /* Alert.alert(error.response.data.error); */
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message);
        }
        console.log(err.config);
      }
    },
    [user?.id],
  );

  async function handleVideoUpload(): Promise<void> {
    try {
      const document = await SelectDocument();
      if (document) {
        Toast.show('Efetuando o upload...', Toast.SHORT, ['UIAlertController']);
        setUploading(true);
        console.log(video?.id, 'tesssssssssssss');
        const formData = new FormData();

        formData.append('file', document);
        const response = await api.put(
          `${api.defaults.baseURL}/arqfornecedor/video/${video?.id}`,
          formData,
          {
            onUploadProgress: (e) => {
              const progresss = Math.round((e.loaded * 100) / e.total);

              setProgress(progresss);
            },
          },
        );
        console.log(response.data, 'retettete');
        setVideo(response.data);
        setUploading(false);
        setProgress(0);
        Toast.show('Video atualizado', Toast.SHORT, ['UIAlertController']);
      } else {
        Toast.show('Operação Cancelada', Toast.SHORT, ['UIAlertController']);
        setUploading(false);
      }
    } catch (error) {
      setUploading(false);
      setProgress(0);
      console.log(JSON.stringify(error, null, 2));
      console.log(error, 'jonathan');
      console.log(Object(error.response), 'salve');
      /* Alert.alert(error.response.data.error); */
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

  async function getFornecedor(): Promise<void> {
    console.log('dfdf');
    setLoading(true);

    api
      .get<IReponseFile>(`${api.defaults.baseURL}/fornecedor/${user?.id}`)
      .then((response) => {
        const { arquivos } = response.data;
        const responseFiles = [];
        const aux = [];
        let j = 0;
        arquivos.forEach((file, i) => {
          if (file.arquivo_tipo === 'imagem') {
            console.log(file.arquivo_tipo);
            aux[j] = {
              id: file.id,
              url: file.url,
              arquivo_tipo: file.arquivo_tipo,
              nome_original: file.nome_original,
              isFilled: true,
            };
            j += 1;
          } else {
            responseFiles[i] = {
              id: '',
              url: '',
              isFilled: false,
            };
          }
        });
        console.log(aux, 'rererererer');
        for (let i = j; i < 5; i += 1) {
          aux.push({ id: '', url: '', isFilled: false });
        }

        setFiles(aux);

        /* const responseFiles = Array.from({ length: 5 }, (_v, k) => {
          try {
            return {
              id: arquivos[k].id,
              url: arquivos[k].url,
              arquivo_tipo: arquivos[k].arquivo_tipo,
              nome_original: arquivos[k].nome_original,
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
        setFiles(responseFiles); */
        u = 0;
        for (let i = 0; i < response.data.arquivos.length; i += 1) {
          if (response.data.arquivos[i].arquivo_tipo === 'video') {
            setVideo(response.data.arquivos[i]);
            console.log(response.data.arquivos[i], 'gfgf');
          }
        }
        console.log(video, 'tets');

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    /* setLoading(false); */
    /* console.log(JSON.stringify(response.data, null, 2)); */
    console.log('fdllllll');
  }

  const handleDeleteImage = React.useCallback(async (file: IFile) => {
    try {
      await api.delete(`/arqfornecedor/imagem/${file.id}`);
      console.log(file.id);
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
    <Container>
      {!loading ? (
        <KeyboardAwareScrollView>
          <Form>
            <MainTitle>Fotos (até 4 fotos)</MainTitle>

            <ContentPhotos>
              <FlatList
                horizontal
                data={files}
                extraData={files}
                renderItem={({ item, index }) => (
                  <ButtonPhoto
                    url={item.url}
                    size={getSize()}
                    style={index > 0 ? { marginLeft: 10 } : {}}
                    onPress={() => handleSaveImage(item, index)}
                    onRemove={() => {
                      handleConfirmDelete(item);
                    }}
                  />
                )}
                keyExtractor={(item, index) => String(index)}
              />
            </ContentPhotos>
            <MainTitle>Vídeo (até 1 minuto) </MainTitle>
            {uploading ? (
              <AnimatedCircularProgress
                size={50}
                width={3}
                fill={progress}
                tintColor={colors.primary}
                backgroundColor={colors.regular}
              >
                {(fill) => <Text>{`${progress}%`}</Text>}
              </AnimatedCircularProgress>
            ) : (
              <VideoWrapper>
                <VideoPlayer
                  source={{
                    uri: video?.url,
                  }}
                  disableBack
                />
                <VideoProps>
                  <VideoPropsTextWrapper>
                    <VideoPropsText>
                      <Icon name="check-circle" color="green" size={20} />

                      {` ${video?.nome_original}`}
                    </VideoPropsText>
                  </VideoPropsTextWrapper>

                  <VideoPropsButton onPress={() => handleVideoUpload()}>
                    <Icon name="trash" color="red" size={28} />
                  </VideoPropsButton>
                </VideoProps>
              </VideoWrapper>
            )}

            {/*   <RegisterButton loading={loading}>
              <RegisterButtonText>Atualizar dados</RegisterButtonText>
            </RegisterButton> */}
          </Form>
        </KeyboardAwareScrollView>
      ) : (
        <Loader loading={loading} />
      )}
    </Container>
  );
};

export default Settings;
