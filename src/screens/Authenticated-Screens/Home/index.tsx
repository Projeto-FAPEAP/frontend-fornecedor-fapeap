import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  WelcomeText,
  TopTabMenu,
  OrderButton,
  ProductsButton,
  TopTabMenuTextActived,
  TopTabMenuTextInActived,
  TopTabMenuInWrapper,
  Section,
  SectionTitle,
  ListRow,
  ListWrapper,
  ListRowTitle,
  ListRowSubTitle,
  SearchInput,
  SearchWrapper,
  AddButton,
  AddButtonText,
  ListProducts,
  ListProductsImageWrapper,
  ListProductsTextWrapper,
} from './styles';

const Home: React.FC = () => {
  const [delivery, setDelivery] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  // const [pictures, setPictures] = useState([5]);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const [photoList, setPhotoList] = useState<ImagePickerResponse[]>([]);
  const [video, setVideo] = useState({});
  const [videoSelected, setVideoSelected] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(true);
  function changeToOrders(): void {
    setShowOrders(true);
    setShowProducts(false);
  }
  function changeToProducts(): void {
    setShowProducts(true);
    setShowOrders(false);
  }
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
  function handleChoosePhoto(): void {
    // Alert.alert('Jonathan');
    if (photoList.length < 5) {
      const photos = photoList;

      const options = {};
      ImagePicker.launchImageLibrary(options, (Response) => {
        if (Response.uri) {
          photos.push(Object(Response));

          setPhotoList(photos);
          setExtraPhoto(true);
          Alert.alert('Adicionado com Sucesso!');
        }
        setExtraPhoto(false);
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
          setVideo(response);
          console.log(response.fileSize, 'jonatha');
          setVideoSelected(true);
          Alert.alert('Adicionado com Sucesso!');
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

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <WelcomeText>Olá, Usuário</WelcomeText>
        </Header>

        <TopTabMenu>
          <OrderButton onPress={() => changeToOrders()}>
            {showOrders ? (
              <TopTabMenuInWrapper>
                <Icon name="shopping-cart" size={32} color="#84378F" />
                <TopTabMenuTextActived>Pedidos</TopTabMenuTextActived>
              </TopTabMenuInWrapper>
            ) : (
              <TopTabMenuInWrapper>
                <Icon name="shopping-cart" size={32} color="#666666" />
                <TopTabMenuTextInActived>Pedidos</TopTabMenuTextInActived>
              </TopTabMenuInWrapper>
            )}
          </OrderButton>

          <ProductsButton onPress={() => changeToProducts()}>
            {showProducts ? (
              <TopTabMenuInWrapper>
                <Icon name="list" size={32} color="#84378F" />
                <TopTabMenuTextActived>Produtos</TopTabMenuTextActived>
              </TopTabMenuInWrapper>
            ) : (
              <TopTabMenuInWrapper>
                <Icon name="list" size={32} color="#666666" />
                <TopTabMenuTextInActived>Produtos</TopTabMenuTextInActived>
              </TopTabMenuInWrapper>
            )}
          </ProductsButton>
        </TopTabMenu>
        {showProducts ? (
          <View>
            <SearchWrapper>
              <SearchInput placeholder="Buscar Produto" />
              <AddButton>
                <AddButtonText>Adicionar</AddButtonText>
              </AddButton>
            </SearchWrapper>
            <ListWrapper>
              <FlatList
                scrollEnabled={false}
                horizontal
                data={photoList}
                extraData={extraPhoto}
                ListFooterComponent={() => (
                  <View style={{ backgroundColor: '#F2F1F7' }}>
                    <ListProducts>
                      <ListProductsImageWrapper
                        source={require('../../../assets/acai_1.jpg')}
                        resizeMode="contain"
                      />
                      <ListProductsTextWrapper>
                        <ListRowTitle>Açaí - 1 Litro</ListRowTitle>
                        <ListRowSubTitle>1 litro R$7.00</ListRowSubTitle>
                        <ListRowSubTitle>
                          <Icon name="check-circle" color="green" size={20} />
                          {' ' + 'Disponivel'}
                        </ListRowSubTitle>
                      </ListProductsTextWrapper>
                    </ListProducts>
                    <ListProducts>
                      <ListProductsImageWrapper
                        source={require('../../../assets/acai_1.jpg')}
                        resizeMode="contain"
                      />
                      <ListProductsTextWrapper>
                        <ListRowTitle>Açaí - 1 Litro</ListRowTitle>
                        <ListRowSubTitle>1 litro R$7.00</ListRowSubTitle>
                        <ListRowSubTitle>
                          <Icon name="check-circle" color="green" size={20} />
                          {' ' + 'Disponivel'}
                        </ListRowSubTitle>
                      </ListProductsTextWrapper>
                    </ListProducts>
                    <ListProducts>
                      <ListProductsImageWrapper
                        source={require('../../../assets/acai_1.jpg')}
                        resizeMode="contain"
                      />
                      <ListProductsTextWrapper>
                        <ListRowTitle>Açaí - 1 Litro</ListRowTitle>
                        <ListRowSubTitle>1 litro R$7.00</ListRowSubTitle>
                        <ListRowSubTitle>
                          <Icon name="check-circle" color="green" size={20} />
                          {' ' + 'Disponivel'}
                        </ListRowSubTitle>
                      </ListProductsTextWrapper>
                    </ListProducts>
                    <ListProducts>
                      <ListProductsImageWrapper
                        source={require('../../../assets/acai_1.jpg')}
                        resizeMode="contain"
                      />
                      <ListProductsTextWrapper>
                        <ListRowTitle>Açaí - 1 Litro</ListRowTitle>
                        <ListRowSubTitle>1 litro R$7.00</ListRowSubTitle>
                        <ListRowSubTitle>
                          <Icon name="ban" color="red" size={20} />
                          {' ' + 'Indisponivel'}
                        </ListRowSubTitle>
                      </ListProductsTextWrapper>
                    </ListProducts>
                  </View>
                )}
                renderItem={({ item, index }) => (
                  <MediaSpotButton onPress={() => removePhoto(index)}>
                    <RemoveMediaButtonWrapper
                      source={item}
                      resizeMode="contain"
                    >
                      <Icon color="#EA3232" size={35} name="trash-o" />
                    </RemoveMediaButtonWrapper>
                  </MediaSpotButton>
                )}
                keyExtractor={(index) => String(index.uri)}
              />
            </ListWrapper>
          </View>
        ) : null}
        {showOrders ? (
          <View>
            <Section>
              <SectionTitle> Pedidos Pendentes</SectionTitle>
            </Section>
            <ListWrapper>
              <FlatList
                scrollEnabled={false}
                horizontal
                data={photoList}
                extraData={extraPhoto}
                ListFooterComponent={() => (
                  <View style={{ backgroundColor: '#F2F1F7' }}>
                    <ListRow>
                      <ListRowTitle>Nome do cliente</ListRowTitle>
                      <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                      <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                      <ListRowSubTitle>
                        Tipo de Pedido: Delivery
                      </ListRowSubTitle>
                    </ListRow>
                    <ListRow>
                      <ListRowTitle>Nome do cliente</ListRowTitle>
                      <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                      <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                      <ListRowSubTitle>
                        Tipo de Pedido: Delivery
                      </ListRowSubTitle>
                    </ListRow>
                  </View>
                )}
                renderItem={({ item, index }) => (
                  <MediaSpotButton onPress={() => removePhoto(index)}>
                    <RemoveMediaButtonWrapper
                      source={item}
                      resizeMode="contain"
                    >
                      <Icon color="#EA3232" size={35} name="trash-o" />
                    </RemoveMediaButtonWrapper>
                  </MediaSpotButton>
                )}
                keyExtractor={(index) => String(index.uri)}
              />
            </ListWrapper>
            <Section>
              <SectionTitle> Pedidos Confirmados</SectionTitle>
            </Section>
            <ListWrapper>
              <FlatList
                scrollEnabled={false}
                horizontal
                data={photoList}
                extraData={extraPhoto}
                ListFooterComponent={() => (
                  <View style={{ backgroundColor: '#F2F1F7' }}>
                    <ListRow>
                      <ListRowTitle>Nome do cliente</ListRowTitle>
                      <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                      <ListRowSubTitle>Status: Entregando</ListRowSubTitle>
                      <ListRowSubTitle>
                        Tipo de Pedido: Delivery
                      </ListRowSubTitle>
                    </ListRow>
                    <ListRow>
                      <ListRowTitle>Nome do cliente</ListRowTitle>
                      <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                      <ListRowSubTitle>
                        Status: Á espera do cliente
                      </ListRowSubTitle>
                      <ListRowSubTitle>Tipo de Pedido: Reserva</ListRowSubTitle>
                    </ListRow>
                  </View>
                )}
                renderItem={({ item, index }) => (
                  <MediaSpotButton onPress={() => removePhoto(index)}>
                    <RemoveMediaButtonWrapper
                      source={item}
                      resizeMode="contain"
                    >
                      <Icon color="#EA3232" size={35} name="trash-o" />
                    </RemoveMediaButtonWrapper>
                  </MediaSpotButton>
                )}
                keyExtractor={(index) => String(index.uri)}
              />
            </ListWrapper>
          </View>
        ) : null}
        {/* <Section>
          <SectionTitle> Pedidos Pendentes</SectionTitle>
        </Section>
        <ListWrapper>
          <FlatList
            scrollEnabled={false}
            horizontal
            data={photoList}
            extraData={extraPhoto}
            ListFooterComponent={() => (
              <View style={{ backgroundColor: '#F2F1F7' }}>
                <ListRow>
                  <ListRowTitle>Nome do cliente</ListRowTitle>
                  <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                  <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                  <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
                </ListRow>
                <ListRow>
                  <ListRowTitle>Nome do cliente</ListRowTitle>
                  <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                  <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                  <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
                </ListRow>
              </View>
            )}
            renderItem={({ item, index }) => (
              <MediaSpotButton onPress={() => removePhoto(index)}>
                <RemoveMediaButtonWrapper source={item} resizeMode="contain">
                  <Icon color="#EA3232" size={35} name="trash-o" />
                </RemoveMediaButtonWrapper>
              </MediaSpotButton>
            )}
            keyExtractor={(index) => String(index.uri)}
          />
        </ListWrapper>
        <Section>
          <SectionTitle> Pedidos Confirmados</SectionTitle>
        </Section>
        <ListWrapper>
          <FlatList
            scrollEnabled={false}
            horizontal
            data={photoList}
            extraData={extraPhoto}
            ListFooterComponent={() => (
              <View style={{ backgroundColor: '#F2F1F7' }}>
                <ListRow>
                  <ListRowTitle>Nome do cliente</ListRowTitle>
                  <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                  <ListRowSubTitle>Status: Entregando</ListRowSubTitle>
                  <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
                </ListRow>
                <ListRow>
                  <ListRowTitle>Nome do cliente</ListRowTitle>
                  <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                  <ListRowSubTitle>Status: Á espera do cliente</ListRowSubTitle>
                  <ListRowSubTitle>Tipo de Pedido: Reserva</ListRowSubTitle>
                </ListRow>
              </View>
            )}
            renderItem={({ item, index }) => (
              <MediaSpotButton onPress={() => removePhoto(index)}>
                <RemoveMediaButtonWrapper source={item} resizeMode="contain">
                  <Icon color="#EA3232" size={35} name="trash-o" />
                </RemoveMediaButtonWrapper>
              </MediaSpotButton>
            )}
            keyExtractor={(index) => String(index.uri)}
          />
        </ListWrapper> */}
        {/* <Form>
          <Input placeholder="Seu nome" />
          <Input placeholder="Nome do estabelecimento" />
          <Input placeholder="CPF/CNPJ" />
          <Input placeholder="Endereço" />
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
          {delivery ? <Input placeholder="Qual a taxa de entrega?" /> : null}
          <Input placeholder="Contato whatsapp" />
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
              renderItem={({ item, index }) => (
                <MediaSpotButton onPress={() => removePhoto(index)}>
                  <RemoveMediaButtonWrapper source={item} resizeMode="contain">
                    <Icon color="#EA3232" size={35} name="trash-o" />
                  </RemoveMediaButtonWrapper>
                </MediaSpotButton>
              )}
              keyExtractor={(index) => String(index.uri)}
            />
          </WrapperList>
          <P>Video do Estabelecimento(até 1 minuto)</P>
          {videoSelected ? (
            <MediaSpotButton onPress={() => removeVideo()}>
              <AddMediaButtonWrapper>
                <Icon color="#EA3232" size={35} name="trash-o" />
              </AddMediaButtonWrapper>
            </MediaSpotButton>
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
        </Form> */}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Home;
