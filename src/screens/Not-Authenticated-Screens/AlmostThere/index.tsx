import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

import MediaMeta from 'src/screens/Authenticated-Screens/Settings/node_modules/react-native-media-meta';

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
  MediaSpot,
  MediaSpotButton,
  WrapperList,
  AddMediaButtonWrapper,
  RemoveMediaButtonWrapper,
  LearningSlide,
  MediaWrapper,
  RemoveMedia,
} from './styles';

const AlmostThere: React.FC = () => {
  const [delivery, setDelivery] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  // const [pictures, setPictures] = useState([5]);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const [photoList, setPhotoList] = useState<ImagePickerResponse[]>([]);
  const [video, setVideo] = useState({});
  const [videoSelected, setVideoSelected] = useState(false);
  const [learning, setLearning] = useState(false);
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
            console.log(photos[i].uri, 'jonathn', Response.uri, 'jogo', i);
            if (String(photos[i].uri) === Response.uri) {
              console.log(photos[i], Response.uri);
              Repeat = true;
            }
          }

          if (Repeat) {
            console.log('éfalse');
            Alert.alert(
              'Aviso',
              'Você já adicionou essa imagem, evite adicionar imagens repetidas!',
            );
          } else {
            console.log('é verdar');
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

  function isEmpty(obj): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <BackButtonWrapper>
            <Icon color="#84378F" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <Title>Quase lá</Title>
        </Header>
        <Form>
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
          <P>Video do Estabelecimento(até 1 minuto)</P>
          {videoSelected ? (
            <MediaWrapper>
              {!isEmpty(video) ? (
                <Video
                  source={{ uri: video }}
                  style={{
                    width: '100%',
                    height: '100%',

                    position: 'absolute',
                  }}
                  poster={video}
                  resizeMode="contain"
                  controls
                />
              ) : (
                console.log(video)
              )}
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
            <RegisterButtonText>Registre-me</RegisterButtonText>
          </RegisterButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
};
export default AlmostThere;
