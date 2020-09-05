import OneSignal, {
  OpenResult,
  ReceivedNotification,
} from 'react-native-onesignal';

const apikey = '344214ab-5d79-4019-a9d4-ef29f23e0356';

function onReceived(_notification: ReceivedNotification): void {
  // console.tron.warn('Notification received: ', notification);
}

async function onOpened(openResult: OpenResult): Promise<void> {
  try {
    if (openResult.notification.payload.additionalData) {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = openResult.notification.payload.additionalData;
      // console.log(data); // dados da notificação
      // switch (data.type) {
      //   case 'NOVO_PEDIDO':
      //     //  redireciona pra tela home e atualiza a lista
      //     break;
      //   case 'PEDIDO_CANCELADO':
      //   // redireciona pra do pedido cancelado
      //   default:
      //     //
      //     break;
      // }
      // NavigationService.navigate('DetailRequest', { item: { id: pedido_id } });
    } else {
      // NavigationService.navigate('Main');
    }
  } catch (error) {
    // NavigationService.navigate('Main');
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
