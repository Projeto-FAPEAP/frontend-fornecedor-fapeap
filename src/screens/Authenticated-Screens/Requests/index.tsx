// import React, { useState, useEffect, useContext } from 'react';
// import { View, FlatList, Alert, Image, Modal } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import RNPickerSelect from 'react-native-picker-select';
// import GestureRecognizer from 'react-native-swipe-gestures';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import AsyncStorage from '@react-native-community/async-storage';
// import { useNavigation } from '@react-navigation/native';

// import AuthContext from '../../../contexts/auth';
// import api from '../../../services/api';
// import Loader from '../../utils/index';
// import {
//   Container,
//   Section,
//   SectionTitle,
//   ListRow,
//   ListRowTitle,
//   ListRowSubTitle,
//   ListWrapperOrders,
// } from './styles';

// interface Orders {
//   id: string;
//   status_pedido: string;
//   tipo_da_compra: boolean;
//   total: number;
//   consumidor: {
//     nome: string;
//   };
// }

// // import * as S from './styles';

// const Requests: React.FC = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [ordersData, setOrdersData] = useState<Orders[] | undefined>([]);
//   const [pendingLength, setPendingLength] = useState(0);

//   useEffect(() => {
//     setTimeout(function () {
//       getAllOrders();

//     }, 1000);
//   }, []);

//   function handleOrderList(array: Orders[]): void {
//     const ordersdata: Orders[] = array;
//     const pending = [];
//     const confirmed = [];
//     const total: Orders[] = array;
//     let j = 0;
//     let k = 0;

//     for (let i = 0; i < ordersdata.length; i += 1) {
//       if (ordersdata[i].status_pedido === 'Pendente') {
//         pending[j] = ordersdata[i];
//         j += 1;
//       } else {
//         confirmed[k] = ordersdata[i];
//         k += 1;
//       }
//     }

//     for (let i = 0; i < array.length; i += 1) {
//       if (pending.length - 1 >= i) {
//         total[i] = pending[i];
//       } else {
//         total[i] = confirmed[i - pending.length];
//       }
//     }

//     setPendingLength(pending.length);
//     setOrdersData(total);
//   }

//   async function getAllOrders(): Promise<void> {
//     setLoading(true);
//     try {
//       const response = await api.get(
//         `${api.defaults.baseURL}/fornecedor/pedidos`,
//       );
//       /*  console.log(JSON.stringify(response.data, null, 2)); */
//       /* const a = [
//         {
//           total: '35.63',
//           status_pedido: 'Pendente',
//           tipo_da_compra: false,
//           consumidor: {
//             nome: 'teste',
//           },
//         },
//         {
//           total: '35.63',
//           status_pedido: 'Confirmado',
//           tipo_da_compra: false,
//           consumidor: {
//             nome: 'teste',
//           },
//         },
//         {
//           total: '35.63',
//           status_pedido: 'Confirmado',
//           tipo_da_compra: false,
//           consumidor: {
//             nome: 'teste',
//           },
//         },
//         {
//           total: '35.63',
//           status_pedido: 'Pendente',
//           tipo_da_compra: false,
//           consumidor: {
//             nome: 'teste',
//           },
//         },
//         {
//           total: '35.63',
//           status_pedido: 'Pendente',
//           tipo_da_compra: false,
//           consumidor: {
//             nome: 'teste',
//           },
//         },
//       ]; */
//       /* setOrdersData(a); */
//       handleOrderList(response.data);

//       setLoading(false);
//       console.log(loading);
//     } catch (error) {
//       setLoading(false);
//       if (error.message === 'Network Error') {
//         Alert.alert('Verifique sua conexão de internet e tente novamente!!');
//       } else {
//         console.log(JSON.stringify(error, null, 2));
//         console.log(error, 'jonathan');
//         console.log(Object(error.response), 'salve');
//         Alert.alert(error.response.data.error);
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // The request was made but no response was received
//           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//           // http.ClientRequest in node.js
//           console.log(error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.log('Error', error.message);
//         }
//         console.log(error.config);
//       }
//     }
//   }

//   return (
//     <>
//       <Container>
//             <ListWrapperOrders>
//               <FlatList
//                 data={ordersData}
//                 refreshing={false}
//                 onRefresh={() => getAllOrders()}
//                 renderItem={({ item, index }) => (
//                   <View style={{ backgroundColor: '#F2F1F7' }}>
//                     {index === 0 ? (
//                       <Section>
//                         <SectionTitle> Pedidos Pendentes</SectionTitle>
//                       </Section>
//                     ) : null}
//                     {index === pendingLength ? (
//                       <Section>
//                         <SectionTitle> Pedidos Confirmados</SectionTitle>
//                       </Section>
//                     ) : null}
//                     <ListRow
//                       onPress={() => navigation.navigate('OrderDetails')}
//                     >
//                       <ListRowTitle>{item.consumidor.nome}</ListRowTitle>
//                       <ListRowSubTitle>{`Total: R$ ${item.total}`}</ListRowSubTitle>
//                       <ListRowSubTitle>{`Status: R$ ${item.status_pedido}`}</ListRowSubTitle>
//                       <ListRowSubTitle>
//                         {`Tipo de Pedido: ${
//                           item.tipo_da_compra ? 'Delivery' : ' Reserva'
//                         }`}
//                       </ListRowSubTitle>
//                     </ListRow>
//                   </View>
//                 )}
//                 keyExtractor={(item, index) => String(index)}
//               />
//             </ListWrapperOrders>
//         </Container>
//     </>
//   );
// };

// export default Requests;

import React from 'react';
import { Text } from 'react-native';

// import * as S from './styles';

const Requests: React.FC = () => {
  return (
    <>
      <Text>Requests</Text>
    </>
  );
};

export default Requests;
