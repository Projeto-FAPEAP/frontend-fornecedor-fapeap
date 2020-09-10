import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  title: 'light',
  colors: {
    primary: '#730949',
    secundary: '#9b6774',
    success: '#8ebf22',
    danger: '#FF4646',
    warning: '#FFD500',

    background: '#fff',
    border: '#eee',

    title: '#444',
    subtitle: '#666',

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
    Ubuntu: {
      normal: 'Ubuntu-Regular',
      bold: 'Ubuntu-Bold',
      semiBold: 'Ubuntu-Medium',
    },
  },

  metrics: {
    border: 10,
  },

  screen: {
    width: width < height ? width : height,
    height: width < height ? height : width,
  },
};
