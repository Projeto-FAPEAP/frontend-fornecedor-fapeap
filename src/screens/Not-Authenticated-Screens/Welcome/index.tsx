import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import * as S from './styles';

const Welcome: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const navigateToLogin = React.useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const navigateToRegister = React.useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <S.Container>
      <S.IconSpace />
      <S.Footer>
        <S.ContentFooter>
          <S.Title>Quero Açaí</S.Title>
          <S.P>
            Descubra uma nova forma de conectar-se com seus clientes e embarque
            no digital.
          </S.P>
          <S.LoginButton colorText={colors.primary} onPress={navigateToLogin}>
            Fazer login
          </S.LoginButton>
          <S.TextBetweenButtons>ou</S.TextBetweenButtons>
          <S.RegisterButton onPress={navigateToRegister}>
            Registre-se
          </S.RegisterButton>
        </S.ContentFooter>
      </S.Footer>
    </S.Container>
  );
};

export default Welcome;
