import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secundary: string;

      success: string;
      danger: string;
      warning: string;

      background: string;

      title: string;
      subtitle: string;

      transparent: string;
      darkTransparent: string;
      whiteTransparent: string;

      white: string;
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
      black: string;
    };

    fonts: {
      OpenSans: {
        normal: string;
        italic: string;
        italicSemiBold: string;
        bold: string;
        semiBold: string;
      };
    };

    screen: {
      width: number;
      height: number;
    };
  }
}
