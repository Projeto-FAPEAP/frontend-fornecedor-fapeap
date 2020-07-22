import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MediaMeta from 'react-native-media-meta';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

import api from '../../../services/api';
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



declare let Blob: {
  readonly size: number;
  readonly type: string;
  slice(start?: number, end?: number, contentType?: string): Blob;
};
const Register: React.FC = ({ navigation }) => {
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
  useEffect(() => {
    if (showExtraInput === 1) {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  }, [showExtraInput]);

 

  function removePhoto(index: number): void {
   
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

  async function handleChooseVideo(): Promise<void> {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      const videoAux = videoState;
      let teste = { a :res.uri,
        b :res.type, // mime type
        c : res.name,
        d:res.size}
      console.log(JSON.stringify( teste,null,2))
      videoAux[0] = Object(res);
      setVideoState(videoAux);
      console.log(videoState);
      setVideoSelected(true);
      Alert.alert('Adicionado com Sucesso!');
    
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
   
  }
  function removeVideo(): void {
    
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
            setVideoState([]);
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

  async function register(): Promise<void> {
    if (
      (name ||
        storeName ||
        cpfCnpj ||
        email ||
        password ||
        phone ||
        phoneWhatsapp ||
        address ||
        number ||
        neighborhood ||
        cep) === '' ||
      showExtraInput === 0 ||
      photoList.length === 0 ||
      isEmpty(videoState)
    ) {
      Alert.alert('Aviso', 'Preencha todos os campos');
    } else if (showExtraInput === 1 && deliveryTax === '') {
      Alert.alert('Aviso', 'Preencha todos os campos');
    } else {
      const formData = new FormData();
      const photoListArray = photoList;
      const videoAux = videoState;
      formData.append('nome', name);
      formData.append('nome_fantasia', storeName);
      formData.append('cpf_cnpj', cpfCnpj);
      formData.append('email', email);
      formData.append('senha', password);
      formData.append('telefone', phone);
      formData.append('telefone_whatsapp', phoneWhatsapp);
      formData.append('taxa_delivery', deliveryTax);
      formData.append('logradouro', address);
      formData.append('numero_local', number);
      formData.append('bairro', neighborhood);
      formData.append('cep', cep);
      for (let i = 0; i < photoList.length; i += 1) {
        formData.append(
          'files',
          photoListArray[i]
        );
      }
      formData.append(
        'file',
        videoAux[0]
      );
      console.log(JSON.stringify(formData,null,2))
        fetch('https://fapeap.colares.net.br/fornecedor', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data' ,
          },
        })
          .then(
            (response) => response.json(), // if the response is a JSON object
          )
          .then(
            (success) => console.log(success), // Handle the success response object
          )
          .catch(
      
            (error) => console.log(JSON.stringify(error,null,2)), // Handle the error response object
          );
    } 
  }

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <BackButtonWrapper onPress={() => navigation.goBack()}>
            <Icon color="#84378F" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <Title>Crie sua conta</Title>
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
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Telefone"
            onChangeText={(text) => setPhone(text)}
          />
          <Input
            placeholder="Contato whatsapp"
            onChangeText={(text) => setPhoneWhatsapp(text)}
          />

          <Input
            placeholder="CPF/CNPJ"
            onChangeText={(text) => setCpfCnpj(text)}
          />
          <Input
            placeholder="Endereço"
            onChangeText={(text) => setAddress(text)}
          />
          <Input
            placeholder="Número"
            onChangeText={(text) => setNumber(text)}
          />
          <Input
            placeholder="Bairro"
            onChangeText={(text) => setNeighborhood(text)}
          />
          <Input placeholder="CEP" onChangeText={(text) => setCep(text)} />
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

          <RegisterButton onPress={() => register()}>
            <RegisterButtonText>Registre-me</RegisterButtonText>
          </RegisterButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Register;
