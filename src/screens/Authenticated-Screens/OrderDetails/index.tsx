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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  useNavigation,
  useRoute,
  NavigationContainer,
} from '@react-navigation/native';
import Axios from 'axios';
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
  extraData: {
    name: string;
    status: string;
    delivery: boolean;
    logradouro: string;
    numero_local: string;
    cep: string;
    bairro: string;
    total: number;
    date: string;
    subtotal: number;
    tax: number;
  };
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const OrderDetails: React.FC = () => {
  const route = useRoute();
  const { colors } = useTheme();
  const { params } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [itemsList, setItemList] = useState<Items[] | undefined>([]);
  const routeParams = params as IParams;
  const extraData = params as IExtraData;
  const [city, setCity] = React.useState('');
  const { getAllOrders } = useContext(OrderContext);
  useEffect(() => {
    getAllItems();
  }, []);

  async function confirmOrder(): Promise<void> {
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

  async function getAllItems(): Promise<void> {
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
      setItemList(response.data);
      getCityAndUf(extraData.extraData.cep);

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
  }

  async function cancelOrder(): Promise<void> {
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
  }

  async function sendingOrder(): Promise<void> {
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
  }

  function getCityAndUf(cep: string): void {
    console.log(cep, 'jons');
    Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        const { localidade, uf } = response.data;
        setCity(` ${localidade} - ${uf}`);
        setInitializing(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.data);
      });
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
            <Title numberOfLines={1}>{extraData.extraData.name}</Title>
            {extraData.extraData.status !== 'Pendente' &&
            extraData.extraData.delivery ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.canOpenURL(
                    `whatsapp://send?text=${extraData.extraData.logradouro}, nº
                    ${extraData.extraData.numero_local},{' '}
                    ${extraData.extraData.bairro}, ${extraData.extraData.city}`,
                  ).then((response) =>
                    response
                      ? Linking.openURL(
                          `whatsapp://send?text=${extraData.extraData.logradouro}, nº
                          ${extraData.extraData.numero_local},{' '}
                          ${extraData.extraData.bairro}, ${extraData.extraData.city}`,
                        )
                      : Alert.alert(
                          'Aviso',
                          'Instale o whatsapp para utilizar esta função!!',
                        ),
                  );
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.regular,
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
                  Compartilhar Endereço
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
                Date.parse(extraData.extraData.date),
                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: pt },
              )}
            </Text>
          </View>

          {extraData.extraData.status === 'Finalizado' ||
          extraData.extraData.status === 'Cancelado' ? (
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
              {Icone(extraData.extraData.status)}
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
                Pedido {extraData.extraData.status} em{' '}
                {format(
                  Date.parse(extraData.extraData.date),
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
              {Icone(extraData.extraData.status)}
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                {extraData.extraData.status}
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

            {itemsList.map((item) => (
              <>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
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
              </>
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
                {formatPrice(extraData.extraData.subtotal)}
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
                {extraData.extraData.delivery
                  ? formatPrice(extraData.extraData.tax)
                  : '0.00'}
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>Total</Text>
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                {formatPrice(extraData.extraData.total)}
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
            {extraData.extraData.delivery ? (
              <>
                <Text
                  style={{ fontFamily: 'Ubuntu-Bold', textAlign: 'justify' }}
                >
                  Endereço de entrega
                </Text>
                <Text
                  style={{
                    fontFamily: 'Ubuntu-Regular',
                    marginTop: 4,
                    textAlign: 'justify',
                  }}
                >
                  {extraData.extraData.logradouro}, nº{' '}
                  {extraData.extraData.numero_local},{' '}
                  {extraData.extraData.bairro}, {city}
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
          {extraData.extraData.status === 'Reserva confirmada' && (
            <ButtonWrapper>
              <Button loading={loading} onPress={() => confirmOrder()}>
                <ButtonText>Confirmar Reserva</ButtonText>
              </Button>
              <ButtonCancel
                loading={loadingCancel}
                onPress={() => cancelOrder()}
              >
                <ButtonText>Cancelar Reserva</ButtonText>
              </ButtonCancel>
            </ButtonWrapper>
          )}

          {extraData.extraData.status === 'Pendente' ? (
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
          {extraData.extraData.delivery === false ||
          extraData.extraData.status === 'Pedido em rota de entrega' ||
          (extraData.extraData.status === 'Pendente' &&
            extraData.extraData.delivery === true) ? null : (
            <ButtonWrapper>
              <Button loading={loading} onPress={() => sendingOrder()}>
                <ButtonText>
                  <Icon name="motorcycle" size={18} /> A Caminho
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
                    `whatsapp://send?text=${extraData.extraData.address}`,
                  ).then((response) =>
                    response
                      ? Linking.openURL(
                          `whatsapp://send?text=${extraData.extraData.address}`,
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
