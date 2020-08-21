import OneSignal, {
  OpenResult,
  ReceivedNotification,
} from 'react-native-onesignal';

const apikey = '';

function onReceived(_notification: ReceivedNotification): void {
  // console.tron.warn('Notification received: ', notification);
}

function onOpened(openResult: OpenResult): void {
  try {
    if (openResult.notification.payload.additionalData) {
      const data = openResult.notification.payload.additionalData;
      console.log(data);
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
  OneSignal.setLogLevel(6, 0);
  OneSignal.init(apikey, {
    kOSSettingsKeyAutoPrompt: true,
  });
  OneSignal.inFocusDisplaying(0);
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
