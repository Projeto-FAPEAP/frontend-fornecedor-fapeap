import { Alert } from 'react-native';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import ImageResizer, {
  Response as ResponseIR,
} from 'react-native-image-resizer';
import Toast from 'react-native-simple-toast';

const options = {
  title: 'Selecionar foto',
  cancelButtonTitle: 'Cancelar',
  chooseFromLibraryButtonTitle: 'Escolher da galeria',
  takePhotoButtonTitle: 'Tirar nova foto',
  storageOptions: {
    privateDirectory: true,
    skipBackup: true,
    path: 'images',
  },
} as ImagePickerOptions;

const maxFileSize = 10000000;

const resizeImage = (
  image: ImagePickerResponse,
  rotation = 0,
): Promise<ImagePickerResponse> =>
  new Promise((resolve) => {
    ImageResizer.createResizedImage(image.uri, 1300, 800, 'JPEG', 100, rotation)
      .then(({ uri, width, height, size }: ResponseIR) => {
        resolve({
          ...image,
          uri,
          width,
          height,
          fileSize: size || image.fileSize,
        });
      })
      .catch((err) => {
        return Alert.alert(
          'Unable to resize the photo',
          `Check the console for full the error message ${err}`,
        );
      });
  });

export default async function SelectPhoto(): Promise<ImagePickerResponse | null> {
  const imageSelected = (): Promise<ImagePickerResponse | null> =>
    new Promise((resolve) => {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          Toast.show('Operação cancelada', Toast.SHORT, ['UIAlertController']);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          Toast.show(
            'Ocorreu um erro ao selecionar a foto, tente novamente',
            Toast.SHORT,
            ['UIAlertController'],
          );
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          resolve(response);
        }
        resolve(null);
      });
    });

  const image = await imageSelected();

  if (!image) return null;

  if (image.fileSize > maxFileSize) {
    Toast.show('Limite máximo permitido para envio é de 10MB', Toast.SHORT, [
      'UIAlertController',
    ]);
    return null;
  }

  return image;
}
