import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import { useAuth } from '@contexts/auth';
import {
  useNavigation,
  useRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import OrderContext from '../../../contexts/order';
import api from '../../../services/api';
import formatPrice from '../../../utils/formatPrice';
import Loader from '../../utils/index';
import {
  Container,
  Title,
  SubTitle,
  Agroup,
  TextWrapper,
  ContentPhotos,
  PhotoWrapper,
  Photo,
  MainTitle,
  VideoWrapper,
  ContentVideo,
} from './styles';

interface UserData {
  nome: string;
  email: string;
  nome_estabelecimento: string;
  numero_local: string;
  numero: string;
  telefone: string;
  telefone_whatsapp: string;
  cpf_cnpj: string;
  taxa_delivery: string;
  cep: string;
  nome_fantasia: string;
  bairro: string;
  logradouro: string;
}

interface IFile {
  id: string;
  url: string;
  isFilled: boolean;
  arquivo_tipo: string;
}

const VisualizeRegister: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [files, setFiles] = React.useState<IFile[]>([]);
  const [video, setVideo] = React.useState('teste');
  const { user } = useAuth();

  useEffect(() => {
    getFornecedor();
  }, [user?.id]);

  const getFornecedor = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/fornecedor/${user?.id}`);

      setUserData(response.data);

      setFiles(response.data.arquivos);
      for (let i = 0; i < response.data.arquivos.length; i += 1) {
        if (response.data.arquivos[i].arquivo_tipo === 'video') {
          setVideo(response.data.arquivos[i].url);
        }
      }

      setLoading(false);
      console.log(JSON.stringify(response.data, null, 2));
      console.log('fdllllll');
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
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
  }, [user?.id]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <Container>
      <ScrollView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <TextWrapper>
          <Title>Nome</Title>
          <SubTitle>{userData?.nome}</SubTitle>
        </TextWrapper>
        <TextWrapper>
          <Title>Email</Title>
          <SubTitle>{userData?.email}</SubTitle>
        </TextWrapper>
        <Agroup>
          <TextWrapper>
            <Title>Telefone whatsapp</Title>
            <SubTitle>{userData?.telefone_whatsapp}</SubTitle>
          </TextWrapper>
          <TextWrapper>
            <Title>Telefone</Title>
            <SubTitle>{userData?.telefone}</SubTitle>
          </TextWrapper>
        </Agroup>
        <Agroup>
          <TextWrapper>
            <Title>CPF/CNPJ</Title>
            <SubTitle>{userData?.cpf_cnpj}</SubTitle>
          </TextWrapper>
          <TextWrapper>
            <Title>Estabelecimento</Title>
            <SubTitle>{userData?.nome_fantasia}</SubTitle>
          </TextWrapper>
        </Agroup>
        <Agroup>
          <TextWrapper>
            <Title>Bairro</Title>
            <SubTitle>{userData?.bairro}</SubTitle>
          </TextWrapper>
          <TextWrapper>
            <Title>Cep</Title>
            <SubTitle>{userData?.cep}</SubTitle>
          </TextWrapper>
        </Agroup>
        <Agroup>
          <TextWrapper>
            <Title>Logradouro</Title>
            <SubTitle>{`${userData?.logradouro} `}</SubTitle>
          </TextWrapper>
          <TextWrapper>
            <Title>Número</Title>
            <SubTitle>{userData?.numero_local}</SubTitle>
          </TextWrapper>
        </Agroup>
        {userData?.taxa_delivery !== null ? (
          <TextWrapper>
            <Title>Taxa de Entrega</Title>
            <SubTitle>
              {formatPrice(parseFloat(userData?.taxa_delivery))}
            </SubTitle>
          </TextWrapper>
        ) : (
          <TextWrapper>
            <Title>Taxa de Entrega</Title>
            <SubTitle>------</SubTitle>
          </TextWrapper>
        )}

        <MainTitle>Fotos</MainTitle>
        <ContentPhotos>
          <FlatList
            horizontal
            data={files}
            renderItem={({ item, index }) => (
              <View>
                {item.arquivo_tipo === 'imagem' ? (
                  <PhotoWrapper style={index > 0 ? { marginLeft: 5 } : {}}>
                    <Photo
                      key={`${item.id}-${index}`}
                      source={{
                        uri: item.url,
                      }}
                      resizeMode="cover"
                    />
                  </PhotoWrapper>
                ) : null}
              </View>
            )}
            keyExtractor={(item, index) => String(index)}
          />
          {/* {files.map((file, idx) => (
              <PhotoWrapper>
                <View>
                  {files[0].arquivo_tipo === 'imagem' ? (
                    <Photo
                      key={`${file.id}-${idx}`}
                      source={{
                        uri: files[0].url,
                      }}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>
              </PhotoWrapper>
            ))} */}
        </ContentPhotos>
        <MainTitle>Vídeo</MainTitle>
        <VideoWrapper>
          <VideoPlayer
            paused
            source={{
              uri: video,
            }}
            disableBack
          />
        </VideoWrapper>

        {/* <Video
              source={{
                uri:
                  'https://app-ws-fapeap.s3.amazonaws.com/f9f2523b-d34a-4018-961d-4373fa40a46f-VID-20200722-WA0000.mp4',
              }}
              style={{
                width: '100%',
                height: 250,
              }}
              poster="https://app-ws-fapeap.s3.amazonaws.com/f9f2523b-d34a-4018-961d-4373fa40a46f-VID-20200722-WA0000.mp4"
              resizeMode="contain"
              controls
            /> */}

        {/*    <Video
              source={{
                uri:
                  'https://app-ws-fapeap.s3.amazonaws.com/f9f2523b-d34a-4018-961d-4373fa40a46f-VID-20200722-WA0000.mp4',
              }}
              style={{
                width: '100%',
                height: 250,
              }}
              poster="https://app-ws-fapeap.s3.amazonaws.com/f9f2523b-d34a-4018-961d-4373fa40a46f-VID-20200722-WA0000.mp4"
              resizeMode="contain"
              controls
            /> */}
      </ScrollView>
    </Container>
  );
};

export default VisualizeRegister;
