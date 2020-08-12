import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Alert, Image, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

import IsEmpty from '@components/IsEmpty';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
/* import { zonedTimeToUtc,format } from 'date-fns-tz'; */

import AuthContext from '../../../contexts/auth';
import OrderContext from '../../../contexts/order';
import api from '../../../services/api';
import formatPrice from '../../../utils/formatPrice';
import Loader from '../../utils/index';
import {
  Container,
  Section,
  SectionTitle,
  ListRow,
  ListRowTitle,
  ListRowSubTitle,
  ListWrapperOrders,
  ListRowInnerLeft,
  ListRowInnerRight,
  ListRowPending,
  ListRowConfirmed,
  ListRowTotal,
} from './styles';

interface Orders {
  id: string;
  status_pedido: string;
  delivery: boolean;
  total: number;
  subtotal: number;
  taxa_entrega: number | undefined;
  consumidor: {
    nome: string;
    logradouro: string;
    numero_local: string;
  };
  created_at: string;
}

const Requests: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { loading, pendingLength, getAllOrders, ordersData } = useContext(
    OrderContext,
  );
  /* const [loading, setLoading] = useState(false); */
  /*   const [ordersData, setOrdersData] = useState<Orders[] | undefined>([]); */
  /*   const [pendingLength, setPendingLength] = useState(0); */
  useEffect(() => {
    setTimeout(function () {
      getAllOrders();
    }, 1000);
  }, []);

  return (
    <>
      <Container>
        {!loading ? (
          <View style={{ flex: 1 }}>
            {!loading && ordersData?.length === 0 ? (
              <IsEmpty icon="exclamationcircleo">
                Parece que você não possui pedidos
              </IsEmpty>
            ) : (
              <View style={{ flex: 1 }}>
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
                          onPress={() =>
                            navigation.navigate('OrderDetails', {
                              itemId: item.id,
                              extraData: {
                                name: item.consumidor.nome,
                                status: item.status_pedido,
                                delivery: item.delivery,
                                address: `${item.consumidor.logradouro}, ${item.consumidor.numero_local}`,
                                total: item.total,
                                date: item.created_at,
                                subtotal: item.subtotal,
                                tax: item.taxa_entrega,
                              },
                            })
                          }
                        >
                          <ListRowInnerLeft>
                            <ListRowTitle numberOfLines={1}>
                              {item.consumidor.nome}
                            </ListRowTitle>
                            <ListRowSubTitle>
                              {`Tipo de Pedido: ${
                                item.delivery ? 'Delivery' : ' Reserva'
                              }`}
                            </ListRowSubTitle>
                            <ListRowTotal numberOfLines={1}>
                              {`Total: ${formatPrice(item.total)}`}
                            </ListRowTotal>
                          </ListRowInnerLeft>
                          <ListRowInnerRight>
                            {item.status_pedido === 'Pendente' ? (
                              <ListRowPending>
                                {item.status_pedido}
                              </ListRowPending>
                            ) : (
                              <ListRowConfirmed>
                                {item.status_pedido}
                              </ListRowConfirmed>
                            )}
                            <ListRowSubTitle>
                              {format(
                                Date.parse(item.created_at),
                                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                                { locale: pt },
                              )}
                            </ListRowSubTitle>
                          </ListRowInnerRight>
                        </ListRow>
                      </View>
                    )}
                    keyExtractor={(item, index) => String(index)}
                  />
                </ListWrapperOrders>
              </View>
            )}
          </View>
        ) : (
          <Loader loading={loading} />
        )}
      </Container>
    </>
  );
};

export default Requests;
