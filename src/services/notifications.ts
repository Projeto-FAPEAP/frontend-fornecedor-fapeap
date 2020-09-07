import { Alert } from 'react-native';
import OneSignal, {
  OpenResult,
  ReceivedNotification,
} from 'react-native-onesignal';

import api from './api';
import { navigate } from './navigation';

const apikey = '344214ab-5d79-4019-a9d4-ef29f23e0356';

function onReceived(_notification: ReceivedNotification): void {
  // console.tron.warn('Notification received: ', notification);
}

async function onOpened(openResult: OpenResult): Promise<void> {
  try {
    if (openResult.notification.payload.additionalData) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = openResult.notification.payload.additionalData;
      /* console.log(data);
      switch (data.type) {
        case 'NOVO_PEDIDO': */
      try {
        const response = await api.get(
          `${api.defaults.baseURL}/fornecedor/pedidos`,
        );
        console.log(response.data[0].consumidor, 'jonathan');
        navigate('OrderDetails', {
          itemId: response.data[0].id,
          extraData: {
            name: response.data[0].consumidor.nome,
            status: response.data[0].status_pedido,
            delivery: response.data[0].delivery,
            logradouro: response.data[0].consumidor.logradouro,
            numero_local: response.data[0].consumidor.numero_local,
            bairro: response.data[0].consumidor.bairro,
            cep: response.data[0].consumidor.cep,
            total: response.data[0].total,
            date: response.data[0].created_at,
            subtotal: response.data[0].subtotal,
            tax: response.data[0].taxa_entrega,
          },
        });
        console.log(JSON.stringify(response.data, null, 2));
      } catch (error) {
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

      /*   break;
        case 'PEDIDO_CANCELADO':

        default:
          break;
      }
      NavigationService.navigate('DetailRequest', { item: { id: pedido_id } });
    } else {
      NavigationService.navigate('Main'); */
    }
  } catch (error) {
    // navigate('Requests');
  }
}

function onIds(_device: any): void {
  // console.log('Device info: ', device);
}

function subscribeToNotification(idKey: string): void {
  // OneSignal.setLogLevel(6, 0);
  OneSignal.init(apikey, {
    kOSSettingsKeyAutoPrompt: true,
  });
  // OneSignal.inFocusDisplaying(0);
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  if (idKey) {
    OneSignal.sendTag('user', idKey);
  }
  OneSignal.setSubscription(true);
}

function unsubscribeToNotification(): void {
  OneSignal.init(apikey, {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.deleteTag('user');
}

export { subscribeToNotification, unsubscribeToNotification };
