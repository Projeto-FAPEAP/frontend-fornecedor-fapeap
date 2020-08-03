import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';

export default async (): Promise<undefined | DocumentPickerResponse> => {
  try {
    const allowedTypes = ['public.movie', 'video/mp4'];

    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.video],
    });

    if (!allowedTypes.find((type) => type === res.type)) {
      Toast.show('Tipo de arquivo não permitido', Toast.SHORT, [
        'UIAlertController',
      ]);
      return undefined;
    }

    if (Number(res.size) >= 10000000) {
      Toast.show('Limite máximo permitido para envio é de 10MB', Toast.SHORT, [
        'UIAlertController',
      ]);
    }

    return res;
  } catch (err) {
    Toast.show('Operação cancelada', Toast.SHORT, ['UIAlertController']);
    return undefined;
  }
};
