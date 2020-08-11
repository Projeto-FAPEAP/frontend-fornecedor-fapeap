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

import {
  useNavigation,
  useRoute,
  NavigationContainer,
} from '@react-navigation/native';
import pt, { format } from 'date-fns';

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
    address: string;
    total: number;
    date: string;
    subtotal: number;
    tax: number;
  };
}

const OrderDetails: React.FC = () => {
  const route = useRoute();
  const { params } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [itemsList, setItemList] = useState<Items[] | undefined>([]);
  const routeParams = params as IParams;
  const extraData = params as IExtraData;
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

      setLoading(false);

      getAllOrders().then((response) => {
        Alert.alert('Aviso', 'Pedido Confirmado!!', [
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
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/pedidos/itens/${routeParams.itemId}`,
      );

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

      setInitializing(false);
      setLoading(false);
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
    setLoading(true);
    try {
      const response = await api.put(
        `${api.defaults.baseURL}/cancelarpedidos/${routeParams.itemId}`,
      );
      console.log(JSON.stringify(response.data, null, 2));

      setLoading(false);

      getAllOrders().then((response) => {
        Alert.alert('Aviso', 'Pedido Cancelado!!', [
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

      setLoading(false);

      getAllOrders().then((response) => {
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

  return (
    <Container>
      {!initializing ? (
        <ScrollView
          style={{
            backgroundColor: '#f9f9f9',
            flex: 1,
          }}
        >
          <ClientInformation>
            {/* <ClientInformationImageWrapper>
     <ClientInformationImage
       source={require('../../../assets/Order.png')}
       resizeMode="contain"
     />
   </ClientInformationImageWrapper> */}
            <Span>
              <ClientInformationTextWrapper>
                <Title numberOfLines={1}>{extraData.extraData.name}</Title>

                <SubTitle>{extraData.extraData.address}</SubTitle>
                <SubTitle>
                  {format(
                    Date.parse(extraData.extraData.date),
                    "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                    { locale: pt },
                  )}
                </SubTitle>
              </ClientInformationTextWrapper>
              <ClientInformationButtonWrapper>
                {extraData.extraData.status === 'Pendente' ? (
                  <ListRowPending>{extraData.extraData.status}</ListRowPending>
                ) : (
                  <ListRowConfirmed>
                    {extraData.extraData.status}
                  </ListRowConfirmed>
                )}
                {extraData.extraData.status !== 'Pendente' &&
                extraData.extraData.delivery ? (
                  <ButtonShareLocalization
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

                    <ButtonShareLocalizationText>
                      Compartilhar Endereço
                    </ButtonShareLocalizationText>
                  </ButtonShareLocalization>
                ) : null}
              </ClientInformationButtonWrapper>
            </Span>
          </ClientInformation>
          <OrderInformation>
            <OrderRecipe>
              <ListWrapper>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={itemsList}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <ListWrapperItem>
                      <ListWrapperInner>
                        <TotalText>{item.produto.nome}</TotalText>
                        <TotalText>
                          {formatPrice(parseFloat(item.preco_venda))}
                        </TotalText>
                      </ListWrapperInner>
                      <Amount>{`Quantidade: ${item.quantidade}`}</Amount>
                    </ListWrapperItem>
                  )}
                  keyExtractor={(item, index) => String(index)}
                />
              </ListWrapper>
              <SubTotalSpan>
                <SubTotalSpanInner>
                  <SubTotalText>Taxa de Entrega</SubTotalText>
                  <SubTotalText>
                    {extraData.extraData.delivery
                      ? formatPrice(extraData.extraData.tax)
                      : '0.00'}
                  </SubTotalText>
                </SubTotalSpanInner>
                <SubTotalSpanInner>
                  <SubTotalText>SubTotal</SubTotalText>
                  <SubTotalText>
                    {formatPrice(extraData.extraData.subtotal)}
                  </SubTotalText>
                </SubTotalSpanInner>
              </SubTotalSpan>
              <TotalSpan>
                <TotalText>Total</TotalText>
                <TotalText>{formatPrice(extraData.extraData.total)}</TotalText>
              </TotalSpan>
            </OrderRecipe>
          </OrderInformation>

          {extraData.extraData.status === 'Pendente' ? (
            <ButtonWrapper>
              <Button onPress={() => confirmOrder()}>
                <ButtonText>Confirmar Pedido</ButtonText>
              </Button>
              <ButtonCancel onPress={() => cancelOrder()}>
                <ButtonText>Cancelar Pedido</ButtonText>
              </ButtonCancel>
            </ButtonWrapper>
          ) : null}
          {extraData.extraData.status === 'Pedido em rota de entrega' ||
          (extraData.extraData.status === 'Pendente' &&
            extraData.extraData.delivery === true) ? null : (
            <ButtonWrapper>
                <Button onPress={() => sendingOrder()}>
                <ButtonText>Entregador a caminho</ButtonText>
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
