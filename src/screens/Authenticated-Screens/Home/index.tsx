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
  Modal,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { createNativeWrapper } from 'react-native-gesture-handler';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import AuthContext from '../../../contexts/auth';
import api from '../../../services/api';
import Loader from '../../utils/index';
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
  RemoveProductButton,
  WrapperButtons,
  ListWrapperOrders,
  FormSearchProduct,
  SearchTextInner,
  SearchInputButton,
  HeaderSearchProductInnerSearch,
  HeaderSearchProductInnerIcon,
  HeaderSearchProduct,
  ListWrapperSearchProduct,
  ModalBackgroundSearch,
} from './styles';

interface Products {
  id: string;
  nome: string;
  preco: string;
  status_produto: number;
  estoque_produto: number;
  unidade_medida: string | number;
}

interface Orders {
  id: string;
  status_pedido: string;
  tipo_da_compra: boolean;
  total: number;
  consumidor: {
    nome: string;
  };
}

const Home: React.FC = ({ navigation }) => {
  // Recebe Usuário
  const { user } = useContext(AuthContext);
  /// ///////////////////////////////////////////

  const [delivery, setDelivery] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  // const [pictures, setPictures] = useState([5]);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const [loading, setLoading] = useState(false);
  const [photoList, setPhotoList] = useState<ImagePickerResponse[]>([]);
  const [video, setVideo] = useState({});
  const [videoSelected, setVideoSelected] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(true);
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  // Variaveis referentes ao cadastro do Produto
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [itemsNumber, setItemsNumber] = useState('');
  const [availability, setAvailability] = useState(0);
  const [measurement, setMeasurement] = useState(0);
  const [productphotoList, setProductphotoList] = useState<
    ImagePickerResponse[]
  >([]);
  /// ////////////////////////////////////////////
  // variáveis referentes a listagem de produtos
  const [productsList, setProductsList] = useState<Products[] | undefined>([]);
  /// /////////////////////////////////////////////

  // Variaveis referentes a busca de Produtos
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [search, setSearch] = useState('');
  const [orderDataAux, setOrderDataAux] = useState<Orders[] | undefined>([]);
  // ////////////////////////////////////////////
  // Variaveis referentes ao delete de produtos
  const [selectedProduct, setSelectedProduct] = useState('');
  /// /////////////////////////////////////////

  // Variáveis referentes a listagem de pedidos
  const [ordersData, setOrdersData] = useState<Orders[] | undefined>([]);
  const [pendingLength, setPendingLength] = useState(0);
  // //////////////////////////////////////////
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
    setTimeout(function () {
      getAllOrders();
      getAllProducts();
    }, 1000);
  }, []);

  useEffect(() => {
    if (showExtraInput === 1) {
      setDelivery(true);
    } else {
      setDelivery(false);
    }
  }, [showExtraInput]);

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
      productName === '' ||
      productPrice === '' ||
      itemsNumber === '' ||
      availability === 1 ||
      measurement === 1 ||
      productphotoList.length === 0
    ) {
      Alert.alert('Aviso', 'Preencha todos os campos!!');
    } else {
      console.log(measurement);
      setLoading(true);
      const formData = new FormData();

      const photoListArray = productphotoList;
      const token = await AsyncStorage.getItem('@QueroAçaí-Fornecedor:token');
      console.log(token, 'Jonathan');
      const image = {};

      formData.append('nome', productName);
      formData.append('preco', parseFloat(productPrice));
      formData.append('estoque_produto', itemsNumber);
      formData.append('status_produto', availability === 2);

      formData.append('unidade_medida', measurement);

      for (let i = 0; i < productphotoList.length; i += 1) {
        formData.append('file', photoListArray[i]);
      }
      console.log(productPrice);

      /* fetch('https://fapeap.colares.net.br/fornecedor', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(
          (response) => response.json(), // if the response is a JSON object
        )
        .then(
          (success) => console.log(success), // Handle the success response object
        )
        .catch(
          (error) => console.log(JSON.stringify(error, null, 2)), // Handle the error response object
        ); */

      try {
        const response = await api.post(
          `${api.defaults.baseURL}/produto`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
        setProductName('');
        setItemsNumber('');
        setAvailability(0);
        setMeasurement(0);
        setProductPrice('');
        setProductphotoList([]);
        setAddProductModal(false);
        getAllProducts();
        setLoading(false);
        Alert.alert('Adicionado com Sucesso!!');
      } catch (error) {
        setLoading(false);
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
  }

  async function getProduct(idProduct: string): Promise<void> {
    setLoading(true);
    console.log(idProduct, 'getr');
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/produto/${idProduct}`,
      );
      const available = response.data[0].status_produto ? 2 : 3;
      const Measurement = parseInt(response.data[0].unidade_medida) + 1;
      console.log(Measurement, 'hhhhhhhhhhhhhhhh');
      setProductName(response.data[0].nome);
      setProductPrice(response.data[0].preco);
      setAvailability(available);
      setMeasurement(parseInt(Measurement));
      setItemsNumber(response.data[0].estoque_produto.toString());
      setSelectedProduct(response.data[0].id);
      setLoading(false);
      setEditProductModal(true);
      console.log(JSON.stringify(response.data, null, 2));
      // setProductphotoList(response[0].data.imagens)
    } catch (error) {
      setLoading(false);
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

  async function editProduct(): Promise<void> {
    console.log(measurement, availability, 'coemço');
    if (
      productName === '' ||
      productPrice === '' ||
      itemsNumber === '' ||
      availability === 1 ||
      measurement === 1 ||
      productphotoList.length === 0
    ) {
      Alert.alert('Aviso', 'Preencha todos os campos!!');
    } else {
      setLoading(true);
      console.log(measurement, availability);
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
        const response = await api.put(
          `${api.defaults.baseURL}/produto/${selectedProduct}`,
          {
            nome: productName,
            preco: parseFloat(productPrice),
            status_produto: availability === 2,
            estoque_produto: itemsNumber,
            unidade_medida: measurement - 1,
          },
        );
        console.log(JSON.stringify(response.data, null, 2));

        getAllProducts();
        setLoading(false);
        setEditProductModal(false);
        Alert.alert('Atualizado com Sucesso!!');
      } catch (error) {
        setLoading(false);
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
  }

  async function getAllProducts(): Promise<void> {
    setLoading(true);
    try {
      const response = await api.get(`${api.defaults.baseURL}/produto`);
      /* console.log(JSON.stringify(response.data, null, 2)); */
      handleMeasurement(response.data);

      console.log('jjjjjjjjjjjjjjjj');
      setLoading(false);
      console.log(loading);
    } catch (error) {
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
  }

  function handleMeasurement(data: Array<Products>): void {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].unidade_medida === '1') {
        data[i].unidade_medida = '1 kg';
      } else if (data[i].unidade_medida === '2') {
        data[i].unidade_medida = '1 Litro';
      } else if (data[i].unidade_medida === '3') {
        data[i].unidade_medida = '500 gramas';
      } else if (data[i].unidade_medida === '4') {
        data[i].unidade_medida = '500 ml';
      }
    }
    setProductsList(data);
  }

  async function deleteProduct(): Promise<void> {
    Alert.alert(
      'Remover Produto',
      'Quer mesmo remover?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            console.log(selectedProduct, 'getr');
            try {
              const response = await api.delete(
                `${api.defaults.baseURL}/produto/${selectedProduct}`,
              );
              getAllProducts();
              setEditProductModal(false);
              setLoading(false);
              Alert.alert('Removido com sucesso!!');
              // setProductphotoList(response[0].data.imagens)
            } catch (error) {
              setLoading(false);
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
          },
        },
      ],
      { cancelable: false },
    );
  }

  function openAddProductModal(): void {
    setProductName('');
    setItemsNumber('');
    setAvailability(0);
    setMeasurement(0);
    setProductPrice('');
    setProductphotoList([]);
    setAddProductModal(true);
  }

  async function getAllOrders(): Promise<void> {
    setLoading(true);
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/pedidos`,
      );
      /*  console.log(JSON.stringify(response.data, null, 2)); */
      /* const a = [
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          consumidor: {
            nome: 'teste',
          },
        },
        {
          total: '35.63',
          status_pedido: 'Confirmado',
          tipo_da_compra: false,
          consumidor: {
            nome: 'teste',
          },
        },
        {
          total: '35.63',
          status_pedido: 'Confirmado',
          tipo_da_compra: false,
          consumidor: {
            nome: 'teste',
          },
        },
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          consumidor: {
            nome: 'teste',
          },
        },
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          consumidor: {
            nome: 'teste',
          },
        },
      ]; */
      /* setOrdersData(a); */
      handleOrderList(response.data);

      setLoading(false);
      console.log(loading);
    } catch (error) {
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
  }

  function handleOrderList(array: Orders[]): void {
    const ordersdata: Orders[] = array;
    const pending = [];
    const confirmed = [];
    const total: Orders[] = array;
    let j = 0;
    let k = 0;

    for (let i = 0; i < ordersdata.length; i += 1) {
      if (ordersdata[i].status_pedido === 'Pendente') {
        pending[j] = ordersdata[i];
        j += 1;
      } else {
        confirmed[k] = ordersdata[i];
        k += 1;
      }
    }

    for (let i = 0; i < array.length; i += 1) {
      if (pending.length - 1 >= i) {
        total[i] = pending[i];
      } else {
        total[i] = confirmed[i - pending.length];
      }
    }

    setPendingLength(pending.length);
    setOrdersData(total);
  }

  function handleSearch(): void {
    const orderList = ordersData;
  }

  useEffect(() => {
    if (search !== '') {
      handleSearch();
    }
  }, [search]);

  return (
    <Container>
      {/* <KeyboardAwareScrollView> */}
      <Loader loading={loading} />
      <Header>
        <WelcomeText>{`Olá, ${user.nome}`}</WelcomeText>
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
        <Animatable.View animation="fadeIn">
          <Modal
            transparent
            animationType="none"
            visible={openSearchModal}
            onRequestClose={() => {
              setOpenSearchModal(false);
            }}
          >
            <ModalBackgroundSearch>
              <FormSearchProduct>
                <HeaderSearchProduct>
                  <HeaderSearchProductInnerIcon>
                    <CloseButtonAddProduct
                      onPress={() => {
                        setOpenSearchModal(false);
                      }}
                    >
                      <Icon name="chevron-left" size={28} color="#84378F" />
                    </CloseButtonAddProduct>
                  </HeaderSearchProductInnerIcon>
                  <HeaderSearchProductInnerSearch>
                    <SearchInput
                      onChangeText={(text) => setSearch(text)}
                      placeholder="Buscar Produto"
                    />
                  </HeaderSearchProductInnerSearch>
                </HeaderSearchProduct>

                <ListWrapperSearchProduct>
                  <FlatList
                    scrollEnabled={false}
                    data={productsList}
                    refreshing={false}
                    onRefresh={() => getAllProducts()}
                    renderItem={({ item, index }) => (
                      <ListProducts onPress={() => getProduct(item.id)}>
                        <ListProductsImageWrapper
                          source={require('../../../assets/acai_1.jpg')}
                          resizeMode="contain"
                        />
                        <ListProductsTextWrapper>
                          <ListRowTitle>{item.nome}</ListRowTitle>
                          <ListRowSubTitle>
                            {`${item.unidade_medida} R$ ${item.preco}`}
                          </ListRowSubTitle>
                          {item.status_produto ? (
                            <ListRowSubTitle>
                              <Icon
                                name="check-circle"
                                color="green"
                                size={20}
                              />
                              {' ' + 'Disponivel'}
                            </ListRowSubTitle>
                          ) : (
                            <ListRowSubTitle>
                              <Icon name="ban" color="red" size={20} />
                              {' ' + 'Indisponivel'}
                            </ListRowSubTitle>
                          )}
                        </ListProductsTextWrapper>
                      </ListProducts>
                    )}
                    keyExtractor={(item, index) => String(index)}
                  />
                </ListWrapperSearchProduct>
              </FormSearchProduct>
            </ModalBackgroundSearch>
          </Modal>

          <Modal
            transparent
            animationType="none"
            visible={addProductModal}
            onRequestClose={() => {
              setAddProductModal(false);
            }}
          >
            <KeyboardAwareScrollView>
              <ModalBackground>
                <FormAddProduct>
                  <HeaderAddProduct>
                    <HeaderAddProductInnerTitle>
                      <Title>Cadastro de Produtos</Title>
                    </HeaderAddProductInnerTitle>
                    <HeaderAddProductInnerIcon>
                      <CloseButtonAddProduct
                        onPress={() => {
                          setAddProductModal(false);
                        }}
                      >
                        <Icon name="close" size={35} color="red" />
                      </CloseButtonAddProduct>
                    </HeaderAddProductInnerIcon>
                  </HeaderAddProduct>

                  <Input
                    placeholder="Nome do Produto"
                    onChangeText={(text) => setProductName(text)}
                  />
                  <Input
                    placeholder="Preço do Produto"
                    onChangeText={(text) => setProductPrice(text)}
                    keyboardType="number-pad"
                  />
                  <Input
                    placeholder="Número de items do produto"
                    keyboardType="number-pad"
                    onChangeText={(text) => setItemsNumber(text)}
                  />
                  <DropdownWrappeer>
                    <RNPickerSelect
                      value={availability}
                      onValueChange={(itemValue, itemIndex) =>
                        setAvailability(itemValue)
                      }
                      style={{
                        placeholder: {
                          color: '#2e2e2e',
                        },
                      }}
                      placeholder={{
                        label: 'Selecione a disponibilidade',
                        value: 1,
                        color: '#9EA0A4',
                      }}
                      items={[
                        { label: 'Disponível', value: 2 },
                        { label: 'Indisponível', value: 3 },
                      ]}
                    />
                    {/* <Dropdown
                      selectedValue={availability}
                      onValueChange={(itemValue, itemIndex) =>
                        setAvailability(itemValue)
                      }
                    >
                      <Dropdown.Item label="Disponibilidade?" value={0} />
                      <Dropdown.Item label="Disponível" value={1} />
                      <Dropdown.Item label="Indisponível" value={2} />
                    </Dropdown> */}
                  </DropdownWrappeer>
                  <DropdownWrappeer>
                    <RNPickerSelect
                      value={measurement}
                      onValueChange={(itemValue, itemIndex) =>
                        setMeasurement(itemValue)
                      }
                      style={{
                        placeholder: {
                          color: '#2e2e2e',
                        },
                      }}
                      placeholder={{
                        label: 'Selecione a unidade de medida',
                        value: 1,
                        color: '#999999',
                      }}
                      items={[
                        {
                          label: '1 Quilograma (kg)',
                          value: 2,
                        },
                        { label: '1 Litro (l)', value: 3 },
                        { label: '500 Gramas (g)', value: 4 },
                        { label: '500 Mililitros (ml)', value: 5 },
                      ]}
                    />
                    {/* <Dropdown
                      selectedValue={measurement}
                      onValueChange={(itemValue, itemIndex) =>
                        setMeasurement(itemValue)
                      }
                    >
                      <Dropdown.Item label="Unidade de Medida?" value={0} />
                      <Dropdown.Item label="1 Quilograma (kg)" value={1} />
                      <Dropdown.Item label="1 Litro (l)" value={2} />
                      <Dropdown.Item label="500 Gramas (g)" value={3} />
                      <Dropdown.Item label="500 Mililitros (ml)" value={4} />
                    </Dropdown> */}
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
                              <Icon color="#EA3232" size={35} name="trash-o" />
                            </RemoveMedia>
                          </RemoveMediaButtonWrapper>
                        </MediaWrapper>
                      )}
                      keyExtractor={(index) => String(index.uri)}
                    />
                  </WrapperListAddProduct>

                  <WrapperButtons>
                    <AddProductButton onPress={() => addProduct()}>
                      <AddProductButtonText>
                        Adicionar Produto
                      </AddProductButtonText>
                    </AddProductButton>
                  </WrapperButtons>
                </FormAddProduct>
              </ModalBackground>
            </KeyboardAwareScrollView>
          </Modal>
          <Modal
            transparent
            animationType="none"
            visible={editProductModal}
            onRequestClose={() => {
              setEditProductModal(false);
            }}
          >
            <KeyboardAwareScrollView>
              <ModalBackground>
                <FormAddProduct>
                  <HeaderAddProduct>
                    <HeaderAddProductInnerTitle>
                      <Title>Edição de Produtos</Title>
                    </HeaderAddProductInnerTitle>
                    <HeaderAddProductInnerIcon>
                      <CloseButtonAddProduct
                        onPress={() => {
                          setEditProductModal(false);
                        }}
                      >
                        <Icon name="close" size={35} color="red" />
                      </CloseButtonAddProduct>
                    </HeaderAddProductInnerIcon>
                  </HeaderAddProduct>

                  <Input
                    placeholder="Nome do Produto"
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                  />
                  <Input
                    placeholder="Preço do Produto"
                    value={productPrice}
                    keyboardType="number-pad"
                    onChangeText={(text) => setProductPrice(text)}
                  />
                  <Input
                    placeholder="Número de items do produto"
                    value={itemsNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) => setItemsNumber(text)}
                  />
                  <DropdownWrappeer>
                    <RNPickerSelect
                      value={availability}
                      onValueChange={(value, itemIndex) =>
                        setAvailability(value)
                      }
                      style={{
                        placeholder: {
                          color: '#2e2e2e',
                        },
                      }}
                      placeholder={
                        {
                          /*   label: 'Selecione a disponibilidade',
                        value: 0,
                        color: '#9EA0A4', */
                        }
                      }
                      items={[
                        { label: 'Selecione a disponibilidade', value: 1 },
                        { label: 'Disponível', value: 2 },
                        { label: 'Indisponível', value: 3 },
                      ]}
                    />
                  </DropdownWrappeer>
                  <DropdownWrappeer>
                    <RNPickerSelect
                      value={measurement}
                      onValueChange={(itemValue, itemIndex) =>
                        setMeasurement(itemValue)
                      }
                      style={{
                        placeholder: {
                          color: '#2e2e2e',
                        },
                      }}
                      placeholder={
                        {
                          /*  label: 'Selecione a unidade de medida',
                        value: 1,
                        color: '#999999', */
                        }
                      }
                      items={[
                        {
                          label: 'Selecione a unidade de medida',
                          value: 1,
                        },
                        {
                          label: '1 Quilograma (kg)',
                          value: 2,
                        },
                        { label: '1 Litro (l)', value: 3 },
                        { label: '500 Gramas (g)', value: 4 },
                        { label: '500 Mililitros (ml)', value: 5 },
                      ]}
                    />
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
                              <Icon color="#EA3232" size={35} name="trash-o" />
                            </RemoveMedia>
                          </RemoveMediaButtonWrapper>
                        </MediaWrapper>
                      )}
                      keyExtractor={(index) => String(index.uri)}
                    />
                  </WrapperListAddProduct>
                  <WrapperButtons>
                    <AddProductButton onPress={() => editProduct()}>
                      <AddProductButtonText>Atualizar</AddProductButtonText>
                    </AddProductButton>
                    <RemoveProductButton>
                      <AddProductButtonText
                        onPress={() => {
                          deleteProduct();
                        }}
                      >
                        Excluir
                      </AddProductButtonText>
                    </RemoveProductButton>
                  </WrapperButtons>
                </FormAddProduct>
              </ModalBackground>
            </KeyboardAwareScrollView>
          </Modal>
          <GestureRecognizer onSwipeRight={() => changeToOrders()}>
            <SearchWrapper>
              <SearchInputButton onPress={() => setOpenSearchModal(true)}>
                <SearchTextInner>Buscar Produto</SearchTextInner>
              </SearchInputButton>
              <AddButton
                onPress={() => {
                  openAddProductModal();
                }}
              >
                <AddButtonText>Adicionar</AddButtonText>
              </AddButton>
            </SearchWrapper>
            <ListWrapper>
              <FlatList
                scrollEnabled
                data={productsList}
                refreshing={false}
                onRefresh={() => getAllProducts()}
                /* ListFooterComponent={() => (
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
                )} */
                renderItem={({ item, index }) => (
                  <ListProducts onPress={() => getProduct(item.id)}>
                    <ListProductsImageWrapper
                      source={require('../../../assets/acai_1.jpg')}
                      resizeMode="contain"
                    />
                    <ListProductsTextWrapper>
                      <ListRowTitle>{item.nome}</ListRowTitle>
                      <ListRowSubTitle>
                        {`${item.unidade_medida} R$ ${item.preco}`}
                      </ListRowSubTitle>
                      {item.status_produto ? (
                        <ListRowSubTitle>
                          <Icon name="check-circle" color="green" size={20} />
                          {' ' + 'Disponivel'}
                        </ListRowSubTitle>
                      ) : (
                        <ListRowSubTitle>
                          <Icon name="ban" color="red" size={20} />
                          {' ' + 'Indisponivel'}
                        </ListRowSubTitle>
                      )}
                    </ListProductsTextWrapper>
                  </ListProducts>
                )}
                keyExtractor={(item, index) => String(index)}
              />
            </ListWrapper>
          </GestureRecognizer>
        </Animatable.View>
      ) : null}
      {showOrders ? (
        <Animatable.View animation="fadeIn">
          <GestureRecognizer onSwipeLeft={() => changeToProducts()}>
            <ListWrapperOrders>
              <FlatList
                data={ordersData}
                refreshing={false}
                onRefresh={() => getAllOrders()}
                renderItem={({ item, index }) => (
                  <View style={{ backgroundColor: '#F2F1F7' }}>
                    {index === 0 ? (
                      <Section>
                        <SectionTitle> Pedidos Pendentes</SectionTitle>
                      </Section>
                    ) : null}
                    {index === pendingLength ? (
                      <Section>
                        <SectionTitle> Pedidos Confirmados</SectionTitle>
                      </Section>
                    ) : null}
                    <ListRow
                      onPress={() => navigation.navigate('OrderDetails')}
                    >
                      <ListRowTitle>{item.consumidor.nome}</ListRowTitle>
                      <ListRowSubTitle>{`Total: R$ ${item.total}`}</ListRowSubTitle>
                      <ListRowSubTitle>{`Status: R$ ${item.status_pedido}`}</ListRowSubTitle>
                      <ListRowSubTitle>
                        {`Tipo de Pedido: ${
                          item.tipo_da_compra ? 'Delivery' : ' Reserva'
                        }`}
                      </ListRowSubTitle>
                    </ListRow>
                  </View>
                )}
                keyExtractor={(item, index) => String(index)}
              />
            </ListWrapperOrders>
          </GestureRecognizer>
        </Animatable.View>
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
      {/* </KeyboardAwareScrollView> */}
    </Container>
  );
};

export default Home;
