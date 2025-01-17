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
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  useNavigation,
  useRoute,
  NavigationContainer,
} from '@react-navigation/native';
import Axios from 'axios';
import axios from 'axios';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useTheme } from 'styled-components';

import logo from '../../../assets/icone1024x1024.png';
import Icone from '../../../components/Icons';
import OrderContext from '../../../contexts/order';
import api from '../../../services/api';
import formatPrice from '../../../utils/formatPrice';
import Loader from '../../utils/index';
import {
  Container,
  ClientInformation,
  Span,
  ClientInformationTextWrapper,
  ClientInformationButtonWrapper,
  Title,
  SubTitle,
  ButtonShareLocalization,
  ButtonShareLocalizationText,
  ButtonShareLocalizationIcon,
  OrderRecipe,
  Button,
  ButtonText,
  ButtonWrapper,
  ButtonCancel,
  OrderInformation,
  TotalSpan,
  TotalText,
  SubTotalSpan,
  SubTotalText,
  SubTotalSpanInner,
  ListWrapper,
  ListWrapperItem,
  ListWrapperInner,
  Amount,
  ListRowConfirmed,
  ListRowPending,
  Header,
  Image,
} from './styles';

interface Items {
  id: number;
  preco_venda: string;
  quantidade: string;
  produto: {
    nome: string;
    preco: string;
  };
}

interface IParams {
  itemId: string;
}

interface IExtraData {
  nome: string;
  status_pedido: string;
  delivery: boolean;
  logradouro: string;
  numero_local: string;
  cep: string;
  bairro: string;
  total: number;
  created_at: string;
  subtotal: number;
  taxa_entrega: number;
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const OrderDetails: React.FC = () => {
  const { colors } = useTheme();
  const { params } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [itemsList, setItemList] = useState<Items[] | undefined>([]);
  const routeParams = params as IParams;
  const [objetoPedido, setObjetoPedido] = useState<IExtraData>();
  const [city, setCity] = React.useState('');
  const [localidade, setLoacalidade] = React.useState('');
  const [uf, setUf] = React.useState('');
  const [cep, setCep] = useState('');
  const { getAllOrders } = useContext(OrderContext);

  useEffect(() => {
    getAllItems();
  }, [routeParams.itemId]);

  /*  React.useEffect(() => {
    return () => {
      getAllOrders();
    };
  }, [getAllOrders]); */
  const getAllItems = React.useCallback(async () => {
    setLoading(true);
    console.log(routeParams.itemId);
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/pedidos/itens/${routeParams.itemId}`,
      );
      console.log(routeParams.itemId, 'jogogogo');
      const a = [
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
      ];
      console.log(response.data.objPedido.nome, 'jjjjjjjjjjjjjjjjjjjjjjjjj');
      setObjetoPedido(response.data.objPedido);
      setItemList(response.data.itensPedido);
      getCityAndUf(response.data.objPedido.cep);
      setCep(response.data.objPedido.cep);
      console.log(JSON.stringify(response.data, null, 2));
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
  }, [routeParams.itemId]);

  async function finalizeOrder(): Promise<void> {
    Alert.alert(
      'Finalizar pedido',
      'Você realmente deseja finalizar o pedido?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await api.put(
                `${api.defaults.baseURL}/validarpedidos/${routeParams.itemId}`,
              );
              console.log(JSON.stringify(response.data, null, 2));

              getAllOrders().then((response) => {
                setLoading(false);
                Alert.alert('Aviso', 'Finalizado!!', [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Index'),
                    style: 'default',
                  },
                ]);
              });
            } catch (error) {
              setLoading(false);
              console.log(JSON.stringify(error, null, 2));
              console.log(error, 'jonathan');
              console.log(Object(error.response), 'salve');
              Alert.alert('Aviso', error.response.data.error);
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
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  async function confirmOrder(): Promise<void> {
    Alert.alert(
      'Confirmar pedido',
      'Você realmente deseja confirmar o pedido?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await api.put(
                `${api.defaults.baseURL}/validarpedidos/${routeParams.itemId}`,
              );
              console.log(JSON.stringify(response.data, null, 2));

              getAllOrders().then((response) => {
                setLoading(false);
                Alert.alert('Aviso', 'Confirmado!!', [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Index'),
                    style: 'default',
                  },
                ]);
              });
            } catch (error) {
              setLoading(false);
              console.log(JSON.stringify(error, null, 2));
              console.log(error, 'jonathan');
              console.log(Object(error.response), 'salve');
              Alert.alert('Aviso', error.response.data.error);
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
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  /* async function getAllItems(): Promise<void> {
    setLoading(true);
    console.log(routeParams.itemId);
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/pedidos/itens/${routeParams.itemId}`,
      );
      console.log(routeParams.itemId, 'jogogogo');
      const a = [
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },

        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
      ];
      console.log(response.data.objPedido.nome, 'jjjjjjjjjjjjjjjjjjjjjjjjj');
      setObjetoPedido(response.data.objPedido);
      setItemList(response.data.itensPedido);
      getCityAndUf(response.data.objPedido.cep);

      console.log(JSON.stringify(response.data, null, 2));
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
  } */

  async function cancelOrder(): Promise<void> {
    Alert.alert(
      'Cancelar pedido',
      'Você realmente deseja cancelar o pedido?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            setLoadingCancel(true);
            try {
              const response = await api.put(
                `${api.defaults.baseURL}/cancelarpedidos/${routeParams.itemId}`,
              );
              console.log(JSON.stringify(response.data, null, 2));

              getAllOrders().then((response) => {
                setLoadingCancel(false);
                Alert.alert('Aviso', 'Cancelado!!', [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Index'),
                    style: 'default',
                  },
                ]);
              });
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
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  async function sendingOrder(): Promise<void> {
    Alert.alert(
      'Informar que o pedido está a caminho',
      'Você realmente deseja confirmar que o pedido está a caminho?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await api.put(
                `${api.defaults.baseURL}/validarpedidos/${routeParams.itemId}`,
              );
              console.log(JSON.stringify(response.data, null, 2));

              getAllOrders().then((response) => {
                setLoading(false);

                Alert.alert(
                  'Aviso',
                  'O cliente foi informado que o entregador está a caminho!!',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Index'),
                      style: 'default',
                    },
                  ],
                );
              });
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
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  function getCityAndUf(cep: string): void {
    console.log(cep, 'jons');
    Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const { localidade, uf } = response.data;

        setCity(` ${localidade} - ${uf}`);
        setLoacalidade(localidade);
        setUf(uf);
        setInitializing(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  async function onShare(): Promise<void> {
    try {
      const logradouroFormatado = objetoPedido?.logradouro.split(' ').join('+');

      const respostaAxios = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          objetoPedido?.numero_local
        }+${logradouroFormatado},+${localidade},+${uf}&key=${'AIzaSyARpgEngeu2k129CS3cdlp4HjTUhKyPblU'}`,
      );
      const coordenadasEndereco =
        respostaAxios.data.results[0].geometry.location;

      const url = `https://www.google.com.br/maps/place/${logradouroFormatado},+${objetoPedido?.numero_local}+-+${objetoPedido?.bairro},+${localidade}+-+${uf},+${cep}/@${coordenadasEndereco.lat},${coordenadasEndereco.lng},17z`;

      const result = await Share.share({
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Ops!', 'Algo inesperado aconteceu, tente novamente!');
    }
  }

  return (
    <Container>
      {!initializing ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 20, marginTop: 20 }}
        >
          <Header>
            <Image source={logo} />
            <Title numberOfLines={1} style={{ width: '45%' }}>
              {objetoPedido?.nome}
            </Title>
            {objetoPedido?.status_pedido !== 'Pendente' &&
            objetoPedido?.delivery ? (
              <TouchableOpacity
                onPress={async () => {
                  onShare();
                  /* const logradouroFormatado = objetoPedido?.logradouro
                    .split(' ')
                    .join('+');
                  console.log(logradouroFormatado, 'jjjjjjjjjjjjjjjjjjjjjjjjo');
                  const respostaAxios = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${
                      objetoPedido?.numero_local
                    }+${logradouroFormatado},+${localidade},+${uf}&key=${'AIzaSyARpgEngeu2k129CS3cdlp4HjTUhKyPblU'}`,
                  );
                  const coordenadasEndereco =
                    respostaAxios.data.results[0].geometry.location; */
                  /* const url = `https://www.google.com.br/maps/place/${logradouroFormatado},+${objetoPedido?.numero_local}+-+${objetoPedido?.bairro},+${localidade}+-+${uf},+${cep}@${coordenadasEndereco.lat},${coordenadasEndereco.lng},17z`; */
                  // const url = `https://www.google.com.br/maps/place/${logradouroFormatado},+${objetoPedido?.numero_local}+-+${objetoPedido?.bairro},+${localidade}+-+${uf},+${cep}/@${coordenadasEndereco.lat},${coordenadasEndereco.lng},17z`;
                  /* const url = `https://www.google.com.br/maps/@${coordenadasEndereco.lat},${coordenadasEndereco.lng},17z`; */
                  /* console.log(url, 'jjjjjjjjjjjjjjjjj');
                  Linking.canOpenURL(
                    `whatsapp://send?text=${url}`,
                  ).then((response) =>
                    response
                      ? Linking.openURL(
                          `whatsapp://send?text=https://www.google.com.br/maps/place/Rua+Dr+Braulino,+1325+-+Zerão,+Macapá+-+AP,+68903022/@-0.003605,-51.0900899,17z`,
                        )
                      : Alert.alert(
                          'Aviso',
                          'Instale o whatsapp para utilizar esta função!!',
                        ),
                  ); */
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  backgroundColor: '#39B554',
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: 5,
                }}
              >
                <Icon
                  name="whatsapp"
                  style={{ marginRight: 5 }}
                  size={14}
                  color={colors.white}
                />

                <Text style={{ fontFamily: 'Ubuntu-Regular', color: '#fff' }}>
                  Endereço
                </Text>
              </TouchableOpacity>
            ) : null}
          </Header>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text style={{ fontFamily: 'Ubuntu-Regular', color: '#999' }}>
              Realizado em{' '}
              {format(
                Date.parse(String(objetoPedido?.created_at)),
                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: pt },
              )}
            </Text>
          </View>

          {objetoPedido?.status_pedido === 'Finalizado' ||
          objetoPedido?.status_pedido === 'Cancelado' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                backgroundColor: '#ebebeb',
                padding: 5,
                borderRadius: 5,
              }}
            >
              {Icone(objetoPedido?.status_pedido)}
              {/* <Icon
              name="check-circle"
              style={{ marginRight: 10 }}
              size={30}
              color={
                pedido.status_pedido === 'Finalizado'
                  ? colors.success
                  : colors.danger
              }
            /> */}
              <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                Pedido {objetoPedido?.status_pedido} em{' '}
                {format(
                  Date.parse(objetoPedido?.created_at),
                  "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                  { locale: pt },
                )}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                backgroundColor: '#ebebeb',
                padding: 5,
                borderRadius: 5,
              }}
            >
              {/* <Icon
              name="check-circle"
              style={{ marginRight: 10 }}
              size={30}
              color={colors.danger}
            /> */}
              {Icone(objetoPedido?.status_pedido)}
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                {objetoPedido?.status_pedido}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <View
              style={{
                borderTopColor: '#ebebeb',
                borderTopWidth: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
            />

            {itemsList?.map((item) => (
              <View key={item.id}>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  key={item.id}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: '#ccc',
                        paddingVertical: 2,
                        borderRadius: 5,
                        paddingHorizontal: 5,
                        marginRight: 10,
                      }}
                    >
                      <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                        {item.quantidade}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                      {item.produto.nome}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                    {formatPrice(parseFloat(item.preco_venda))}
                  </Text>
                </View>
                <View
                  style={{
                    borderTopColor: '#ebebeb',
                    borderTopWidth: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                />
              </View>
            ))}
          </View>

          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text style={{ fontFamily: 'Ubuntu-Regular' }}>Subtotal</Text>
              <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                {formatPrice(objetoPedido?.subtotal)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                Taxa de entrega
              </Text>
              <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                {objetoPedido?.delivery
                  ? formatPrice(objetoPedido?.taxa_entrega)
                  : '0.00'}
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>Total</Text>
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                {formatPrice(objetoPedido?.total)}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopColor: '#ebebeb',
              borderTopWidth: 1,
              marginTop: 10,
              marginBottom: 20,
            }}
          />

          <View>
            {objetoPedido?.delivery ? (
              <>
                <Text
                  style={{ fontFamily: 'Ubuntu-Bold', textAlign: 'justify' }}
                >
                  Endereço de entrega
                </Text>
                <Icon
                  name="map-marker"
                  size={25}
                  color={colors.primary}
                  style={{ alignSelf: 'center' }}
                />
                <Text
                  style={{
                    fontFamily: 'Ubuntu-Regular',
                    marginTop: 4,
                    textAlign: 'justify',
                    color: '#4AB2EF',
                  }}
                  onPress={async () => {
                    try {
                      const logradouroFormatado = objetoPedido?.logradouro
                        .split(' ')
                        .join('+');
                      const respostaAxios = await axios.get(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${
                          objetoPedido?.numero_local
                        }+${logradouroFormatado},+${localidade},+${uf}&key=${'AIzaSyARpgEngeu2k129CS3cdlp4HjTUhKyPblU'}`,
                      );
                      console.log(
                        respostaAxios.data,
                        'jjjjjjjjjjjjjjjjjjjjjjjjj',
                        logradouroFormatado,
                      );

                      const coordenadasEndereco =
                        respostaAxios.data.results[0].geometry.location;
                      const scheme = Platform.select({
                        ios: 'maps:0,0?q=',
                        android: 'geo:0,0?q=',
                      });
                      const urll = `https://www.google.com.br/maps/place/${logradouroFormatado},+${objetoPedido?.numero_local}+-+${objetoPedido?.bairro},+${localidade}+-+${uf},+${cep}/@${coordenadasEndereco.lat},${coordenadasEndereco.lng},17z`;
                      const latLng = `${coordenadasEndereco.lat},${coordenadasEndereco.lng}`;
                      const label = 'Custom Label';
                      const url = Platform.select({
                        ios: `${scheme}${label}@${latLng}`,
                        android: urll,
                      });
                      Linking.openURL(url);
                    } catch (error) {
                      Alert.alert(
                        'Ops!',
                        'Algo inesperado aconteceu, tente novamente!',
                      );
                    }
                  }}
                >
                  {objetoPedido?.logradouro}, nº {objetoPedido?.numero_local},{' '}
                  {objetoPedido?.bairro}, {city}
                </Text>
              </>
            ) : (
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  marginTop: 4,
                  textAlign: 'justify',
                }}
              >
                Pedido com retirada no estabelecimento
              </Text>
            )}
          </View>

          <View
            style={{
              borderTopColor: '#ebebeb',
              borderTopWidth: 1,
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          {objetoPedido?.status_pedido === 'Reserva confirmada' && (
            <ButtonWrapper>
              <Button
                enabled={!loading}
                loading={loading}
                onPress={() => finalizeOrder()}
              >
                <ButtonText>Finalizar Pedido</ButtonText>
              </Button>
            </ButtonWrapper>
          )}

          {objetoPedido?.status_pedido === 'Pendente' ? (
            <ButtonWrapper>
              <Button loading={loading} onPress={() => confirmOrder()}>
                <ButtonText>Confirmar Pedido</ButtonText>
              </Button>
              <ButtonCancel
                loading={loadingCancel}
                onPress={() => cancelOrder()}
              >
                <ButtonText>Cancelar Pedido</ButtonText>
              </ButtonCancel>
            </ButtonWrapper>
          ) : null}
          {objetoPedido?.delivery === false ||
          objetoPedido?.status_pedido === 'Pedido em rota de entrega' ||
          (objetoPedido?.status_pedido === 'Pendente' &&
            objetoPedido?.delivery === true) ? null : (
            <ButtonWrapper>
              <Button
                enabled={!loading}
                loading={loading}
                onPress={() => sendingOrder()}
              >
                <ButtonText>
                  <Icon name="truck" size={18} /> A Caminho
                </ButtonText>
              </Button>
            </ButtonWrapper>
          )}
        </ScrollView>
      ) : (
        <Loader loading={loading} />
      )}
    </Container>
  );
};

export default OrderDetails;

{
  /* <ButtonShareLocalization
                onPress={() => {
                  Linking.canOpenURL(
                    `whatsapp://send?text=${objetoPedido?.address}`,
                  ).then((response) =>
                    response
                      ? Linking.openURL(
                          `whatsapp://send?text=${objetoPedido?.address}`,
                        )
                      : Alert.alert(
                          'Aviso',
                          'Instale o whatsapp para utilizar esta função!!',
                        ),
                  );
                }}
              >
                <ButtonShareLocalizationIcon>
                  <Icon name="whatsapp" size={18} color="#fff" />
                </ButtonShareLocalizationIcon>

                <ButtonShareLocalizationIcon>
                  <Icon name="share-alt" size={18} color="#fff" />
                </ButtonShareLocalizationIcon>
              </ButtonShareLocalization> */
}
