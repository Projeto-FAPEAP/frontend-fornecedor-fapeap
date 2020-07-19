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

import axios from 'axios';

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
  // const [pictures, setPictures] = useState([5]);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const [photoList, setPhotoList] = useState<ImagePickerResponse[]>([]);
  const [video, setVideo] = useState<ImagePickerResponse[]>([]);
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

  /*  useLayoutEffect(() => {
    Alert.alert('item adicionado');
  }, [photoList]); */

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

    const videoAux = video;

    ImagePicker.launchImageLibrary(
      options as ImagePickerOptions,
      (response) => {
        if (response.uri) {
          console.log(response, 'aqui');
          MediaMeta.get(response.path)
            .then((metadata) => {
              if (metadata.duration <= 60000) {
                videoAux[0] = Object(response);
                setVideo(videoAux);
                console.log(video);
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
            setVideo([]);
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
    console.log('yy');
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
      isEmpty(video)
    ) {
      Alert.alert('Aviso', 'Preencha todos os campos');
    } else if (showExtraInput === 1 && deliveryTax === '') {
      Alert.alert('Aviso', 'Preencha todos os campos');
    } else {
      const formData = new FormData();

      const photoListArray = photoList;
      const videoAux = video;
      const arquivo = {
        uri: photoListArray[0].uri,
        type: photoListArray[0].type,
        name: photoListArray[0].fileName,
      };

      let splitedArray = [];
      formData.append('nome', name);
      formData.append('nome_fantasia', storeName);
      formData.append('cpf_cnpj', '41');
      formData.append('email', '41');
      formData.append('senha', password);
      formData.append('telefone', phone);
      formData.append('telefone_whatsapp', phoneWhatsapp);
      formData.append('taxa_delivery', deliveryTax);
      formData.append('logradouro', address);
      formData.append('numero_local', 'gf');
      formData.append('bairro', neighborhood);
      formData.append('cep', cep);
      // formData.append('imagens', 'jofo');
      formData.append('arquivo', JSON.stringify(arquivo));
      console.log(arquivo);
      for (let i = 0; i < photoList.length; i += 1) {
        splitedArray = String(photoListArray[i].uri).split('/');
        // console.log(splitedArray[splitedArray.length - 1]);
        // formData.append('video', photoListArray[i].path);
        // formData.append('imagens', photoList);
        /* formData.append(
          'imagens',
          JSON.stringify({
            filename: photoListArray[i].fileName,
            originalname: photoListArray[i].fileName,
            size: photoListArray[i].fileSize,
          }),
        ); */
      }
      /* console.log(videoAux[0]); */
      splitedArray = String(videoAux[0].path).split('/');
      // console.log(videoAux[0]);
      // formData.append('video', videoAux[0].path);
      /* console.log(
        videoAux[0].path,
        'patha ',
        'typeeeee',
        videoAux[0].type,
        'filenameeeeee',
        videoAux[0].fileName,
      ); */
      /* formData.append('video', photo); */
      /* console.log(formData); */
      /// formData.append('video', JSON.stringify(photoListArray[0]));

      // formData.append('video', photoList);
      /* formData.append(
        'video',
        JSON.stringify({
          filename: photoListArray[0].fileName,
          originalname: photoListArray[0].fileName,
          size: photoListArray[0].fileSize,
        }),
      ); */
      // console.log(formData);
      /* axios
        .post('https://fapeap-app.herokuapp.com/fornecedor', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error)); */

      /* try {
        fetch('http://192.168.1.100:3333/fornecedor', {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json, text/plain, ',
            'content-type': 'multipart/form-data;',
          },
        })
          .then(
            (response) => response.json(), // if the response is a JSON object
          )
          .then(
            (success) => console.log(success), // Handle the success response object
          )
          .catch(
            (error) => console.log(error), // Handle the error response object
          );
      } catch (error) {
        console.log(error);
      }
    } */

      try {
        const response = await axios.post(
          'http://192.168.1.100:3333/fornecedor',
          formData,
        );

        console.log(response, 'jonat');
      } catch (error) {
        console.log(error, 'jonathan');
        console.log(Object(error.response), 'salve');

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
              {!isEmpty(video) ? (
                <Video
                  source={{ uri: video[0].uri }}
                  style={{
                    width: '100%',
                    height: '100%',

                    position: 'absolute',
                  }}
                  poster={video[0].uri}
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
