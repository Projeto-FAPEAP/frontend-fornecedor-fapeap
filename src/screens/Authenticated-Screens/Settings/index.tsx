import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MediaMeta from 'react-native-media-meta';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

import AuthContext from '../../../contexts/auth';
import Loader from '../../utils';
import {
  Container,
  Title,
  Input,
  RetrievePasswordButton,
  RetrievePasswordText,
  Form,
  Header,
  RegisterButton,
  RegularText,
  RegisterButtonText,
  P,
  BackButtonWrapper,
  Footer,
  Dropdown,
  DropdownWrappeer,
  MediaSpot,
  MediaSpotButton,
  WrapperList,
  AddMediaButtonWrapper,
  RemoveMediaButtonWrapper,
  MediaWrapper,
  RemoveMedia,
} from './styles';

const Settings: React.FC = ({ navigation }) => {
  const [delivery, setDelivery] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const [photoList, setPhotoList] = useState<ImagePickerResponse[]>([]);
  const [videoState, setVideoState] = useState<ImagePickerResponse[]>([]);
  const [videoSelected, setVideoSelected] = useState(false);
  const [learning, setLearning] = useState(false);
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState('');
  const [deliveryTax, setDeliveryTax] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    if (showExtraInput === 1) {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  }, [showExtraInput]);

  /*  useLayoutEffect(() => {
    Alert.alert('item adicionado');
  }, [photoList]); */
  function logOutt(): void {
    console.log('oiiiiiii');
    logOut();
  }
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

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Loader loading={loading} />
        <Header>
          <BackButtonWrapper onPress={() => navigation.goBack()}>
            <Icon color="#84378F" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <Title>Editar sua conta</Title>
        </Header>
        <Form>
          <Input
            placeholder="Seu nome"
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Nome do estabelecimento"
            onChangeText={(text) => setStoreName(text)}
          />

          <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
          <Input
            placeholder="Senha"
            keyboardType="email-address"
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="CPF/CNPJ"
            keyboardType="number-pad"
            onChangeText={(text) => setCpfCnpj(text)}
          />
          <Input
            placeholder="Telefone"
            keyboardType="number-pad"
            onChangeText={(text) => setPhone(text)}
          />
          <Input
            placeholder="Contato whatsapp"
            keyboardType="number-pad"
            onChangeText={(text) => setPhoneWhatsapp(text)}
          />

          <Input
            placeholder="Endereço"
            onChangeText={(text) => setAddress(text)}
          />
          <Input
            placeholder="Número"
            keyboardType="number-pad"
            onChangeText={(text) => setNumber(text)}
          />
          <Input
            placeholder="Bairro"
            onChangeText={(text) => setNeighborhood(text)}
          />
          <Input
            placeholder="CEP"
            onChangeText={(text) => setCep(text)}
            keyboardType="number-pad"
          />
          <DropdownWrappeer>
            <Dropdown
              selectedValue={showExtraInput}
              onValueChange={(itemValue, itemIndex) =>
                setShowExtraInput(itemValue)
              }
            >
              <Dropdown.Item label="Faz delivery?" value={0} />
              <Dropdown.Item label="Sim, faço delivery" value={1} />
              <Dropdown.Item label="Não" value={2} />
            </Dropdown>
          </DropdownWrappeer>
          {delivery ? (
            <Input
              placeholder="Qual a taxa de entrega?"
              keyboardType="number-pad"
              onChangeText={(text) => setDeliveryTax(text)}
            />
          ) : null}

          <P>Fotos do Estabelecimento(até 4 fotos)</P>

          <WrapperList>
            <FlatList
              horizontal
              data={photoList}
              extraData={extraPhoto}
              ListFooterComponent={() => (
                <MediaSpotButton onPress={() => handleChoosePhoto()}>
                  <AddMediaButtonWrapper>
                    <Icon color="#84378F" size={35} name="plus" />
                  </AddMediaButtonWrapper>
                </MediaSpotButton>
              )}
              /* ListEmptyComponent={() => <View />} */
              renderItem={({ item, index }) => (
                <MediaWrapper>
                  <RemoveMediaButtonWrapper source={item} resizeMode="contain">
                    {learning ? (
                      <Animatable.View
                        animation="slideInRight"
                        iterationCount={5}
                      >
                        <Image source={require('../../../assets/learn.png')} />
                      </Animatable.View>
                    ) : null}
                    <RemoveMedia onPress={() => removePhoto(index)}>
                      <Icon color="#EA3232" size={35} name="trash-o" />
                    </RemoveMedia>
                  </RemoveMediaButtonWrapper>
                </MediaWrapper>
              )}
              keyExtractor={(index) => String(index.uri)}
            />
          </WrapperList>
          <P>Video do Processo Produtivo(até 1 minuto)</P>
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

          <RegisterButton>
            <RegisterButtonText>Atualizar dados</RegisterButtonText>
          </RegisterButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Settings;
