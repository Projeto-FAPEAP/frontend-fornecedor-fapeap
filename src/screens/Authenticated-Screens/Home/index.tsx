import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';
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
  ModalBackground,
  FormAddProduct,
  HeaderAddProduct,
  HeaderAddProductInnerTitle,
  HeaderAddProductInnerIcon,
  AddProductButton,
  AddProductButtonText,
  WrapperListAddProduct,
  MediaSpotButtonAddProduct,
  AddMediaButtonWrapperAddProduct,
  RemoveMediaButtonWrapperAddProduct,
  CloseButtonAddProduct,
  MediaWrapper,
  RemoveMedia,
  RemoveMediaButtonWrapper,
  FormScroll,
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
  const [modalVisibilty, setModalVisibility] = useState(false);

  // Variaveis referentes ao cadastro do Produto
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [itemsNumber, setItemsNumber] = useState('');
  const [availability, setAvailability] = useState(0);
  const [measurement, setMeasurement] = useState(0);
  const [productphotoList, setProductphotoList] = useState<
    ImagePickerResponse[]
  >([]);
  const [learning, setLearning] = useState(false);
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
            const oldPhotosList = productphotoList;
            const newPhotoList = [];
            let j = 0;
            for (let i = 0; i < productphotoList.length; i += 1) {
              if (i !== index) {
                newPhotoList[j] = oldPhotosList[i];
                j += 1;
              }
            }

            setProductphotoList(newPhotoList);
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
    if (productphotoList.length < 2) {
      const photos = productphotoList;
      let Repeat = false;
      const options = {};
      ImagePicker.launchImageLibrary(options, (Response) => {
        if (Response.uri) {
          for (let i = 0; i < productphotoList.length; i += 1) {
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

            setProductphotoList(photos);
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

  async function addProduct(): Promise<void> {
    if (
      (productName || productPrice || itemsNumber) === '' ||
      (availability || measurement) === 0 ||
      productphotoList.length === 0
    ) {
      Alert.alert('Aviso', 'Preencha todos os campos!!');
    } else {
      const formData = new FormData();

      const photoListArray = productphotoList;
      const token = await AsyncStorage.getItem('@QueroAçaí-Fornecedor:token');
      console.log(token, 'Jonathan');
      const image = {};
      formData.append('nome', productName);
      formData.append('preco', productPrice);
      formData.append('estoque_produto', itemsNumber);
      formData.append('status_produto', availability);

      formData.append('unidade_medida', measurement);
      /*  for (let i = 0; i < productphotoList.length; i += 1) {
        image = {
          uri: photoListArray[i].uri,
          type: photoListArray[i].type,
          name: photoListArray[i].fileName,
        };
        formData.append('imagem', image);
      } */
      console.log(formData);
      try {
        const response = await axios.post(
          `${api.defaults.baseURL}/produto`,
          formData,
        );
        console.log(response.data);
        Alert.alert('Adicionado com Sucesso!!');
      } catch (error) {
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
            <Modal
              transparent
              animationType="none"
              visible={modalVisibilty}
              onRequestClose={() => {
                setModalVisibility(false);
              }}
            >
              <ModalBackground>
                <FormAddProduct>
                  <HeaderAddProduct>
                    <HeaderAddProductInnerTitle>
                      <Title>Cadastro de Produtos</Title>
                    </HeaderAddProductInnerTitle>
                    <HeaderAddProductInnerIcon>
                      <CloseButtonAddProduct
                        onPress={() => {
                          setModalVisibility(false);
                        }}
                      >
                        <Icon name="close" size={35} color="red" />
                      </CloseButtonAddProduct>
                    </HeaderAddProductInnerIcon>
                  </HeaderAddProduct>
                  <FormScroll>
                    <Input
                      placeholder="Nome do Produto"
                      onChangeText={(text) => setProductName(text)}
                    />
                    <Input
                      placeholder="Preço do Produto"
                      onChangeText={(text) => setProductPrice(text)}
                    />
                    <Input
                      placeholder="Número de items do produto"
                      onChangeText={(text) => setItemsNumber(text)}
                    />
                    <DropdownWrappeer>
                      <Dropdown
                        selectedValue={availability}
                        onValueChange={(itemValue, itemIndex) =>
                          setAvailability(itemValue)
                        }
                      >
                        <Dropdown.Item label="Disponibilidade?" value={0} />
                        <Dropdown.Item label="Disponível" value={1} />
                        <Dropdown.Item label="Indisponível" value={2} />
                      </Dropdown>
                    </DropdownWrappeer>
                    <DropdownWrappeer>
                      <Dropdown
                        selectedValue={measurement}
                        onValueChange={(itemValue, itemIndex) =>
                          setMeasurement(itemValue)
                        }
                      >
                        <Dropdown.Item label="Unidade de Medida?" value={0} />
                        <Dropdown.Item label="Quilograma (kg)" value={1} />
                        <Dropdown.Item label="Litro (l)" value={2} />
                        <Dropdown.Item label="Grama (g)" value={3} />
                        <Dropdown.Item label="Mililitro (ml)" value={4} />
                      </Dropdown>
                    </DropdownWrappeer>
                    <P>Fotos do Produto (até 2 fotos)</P>

                    <WrapperListAddProduct>
                      <FlatList
                        horizontal
                        data={productphotoList}
                        extraData={extraPhoto}
                        ListFooterComponent={() => (
                          <MediaSpotButtonAddProduct
                            onPress={() => handleChoosePhoto()}
                          >
                            <AddMediaButtonWrapperAddProduct>
                              <Icon color="#84378F" size={35} name="plus" />
                            </AddMediaButtonWrapperAddProduct>
                          </MediaSpotButtonAddProduct>
                        )}
                        /* ListEmptyComponent={() => <View />} */
                        renderItem={({ item, index }) => (
                          <MediaWrapper>
                            <RemoveMediaButtonWrapper
                              source={item}
                              resizeMode="contain"
                            >
                              {learning ? (
                                <Animatable.View
                                  animation="slideInRight"
                                  iterationCount={5}
                                >
                                  <Image
                                    source={require('../../../assets/learn.png')}
                                  />
                                </Animatable.View>
                              ) : null}
                              <RemoveMedia onPress={() => removePhoto(index)}>
                                <Icon
                                  color="#EA3232"
                                  size={35}
                                  name="trash-o"
                                />
                              </RemoveMedia>
                            </RemoveMediaButtonWrapper>
                          </MediaWrapper>
                        )}
                        keyExtractor={(index) => String(index.uri)}
                      />
                    </WrapperListAddProduct>
                  </FormScroll>

                  <AddProductButton onPress={() => addProduct()}>
                    <AddProductButtonText>
                      Adicionar Produto
                    </AddProductButtonText>
                  </AddProductButton>
                </FormAddProduct>
              </ModalBackground>
            </Modal>
            <SearchWrapper>
              <SearchInput placeholder="Buscar Produto" />
              <AddButton
                onPress={() => {
                  setModalVisibility(true);
                }}
              >
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
