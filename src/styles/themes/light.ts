import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  title: 'light',
  colors: {
    primary: '#84378F',
    secundary: '#fff',
    success: '#1AE255',
    danger: '#FF4646',
    warning: '#FFD500',

    background: '#E5E5E5',

    title: '#455A64',
    subtitle: '#B0BEC5',

    transparent: 'transparent',
    darkTransparent: 'rgba(0, 0, 0, 0.6)',
    whiteTransparent: 'rgba(255, 255, 255, 0.3)',

    white: '#fff',
    lighter: '#eee',
    light: '#ddd',
    regular: '#999',
    dark: '#707070',
    darker: '#333',
    black: '#222',
  },

  fonts: {
    OpenSans: {
      normal: 'OpenSans-Regular',
      italic: 'OpenSans-Italic',
      italicSemiBold: 'OpenSans-SemiBoldItalic',
      bold: 'OpenSans-Bold',
      semiBold: 'OpenSans-semiBold',
    },
  },

  screen: {
    width: width < height ? width : height,
    height: width < height ? height : width,
  },
};
