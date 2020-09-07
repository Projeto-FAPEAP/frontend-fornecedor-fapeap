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
  Alert,
  ScrollView,
  Linking,
  FlatList,
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

import logo from '../../../assets/icone1024x1024.png';
import Icone from '../../../components/Icons';
import OrderContext from '../../../contexts/order';
import api from '../../../services/api';
import formatPrice from '../../../utils/formatPrice';
import Loader from '../../utils/index';
import {
  Container,
  Header,
  Image,
  ClientInformation,
  ClientInformationImageWrapper,
  ClientInformationImage,
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

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const HistoryDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [itemsList, setItemList] = useState<Items[] | undefined>([]);
  const [initializing, setInitializing] = useState(true);
  const { itemId } = route.params;
  const [city, setCity] = React.useState('');
  const { extraData } = route.params;
  const { getAllOrders } = useContext(OrderContext);
  useEffect(() => {
    getAllItems();
  }, []);

  async function getAllItems(): Promise<void> {
    setLoading(true);
    console.log(itemId);
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/pedidos/itens/${itemId}`,
      );

      /* const a = [
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
        
      ]; */
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
        `${api.defaults.baseURL}/cancelarpedidos/${itemId}`,
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
        `${api.defaults.baseURL}/validarpedidos/${itemId}`,
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
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
          <Header>
            <Image source={logo} />
            <Title numberOfLines={1}>{extraData.name}</Title>
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
                Date.parse(extraData.date),
                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: pt },
              )}
            </Text>
          </View>

          {extraData.status === 'Finalizado' ||
          extraData.status === 'Cancelado' ? (
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
              {Icone(extraData.status)}
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
                Pedido {extraData.status} em{' '}
                {format(
                  Date.parse(extraData.date),
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
              {Icone(extraData.status)}
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                {extraData.status}
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
                {formatPrice(extraData.subtotal)}
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
                {extraData.delivery ? formatPrice(extraData.tax) : '0.00'}
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>Total</Text>
              <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                {formatPrice(extraData.total)}
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
            {extraData.delivery ? (
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
                  {extraData.logradouro}, nº {extraData.numero_local},{' '}
                  {extraData.bairro}, {city}
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
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </Container>
  );
};

export default HistoryDetails;
