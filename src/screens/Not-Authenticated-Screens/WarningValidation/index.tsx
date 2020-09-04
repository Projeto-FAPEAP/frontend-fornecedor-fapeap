import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

const WarningValidation: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToWelcomeAuth = useCallback(() => {
    navigate('Login');
  }, [navigate]);

  return (
    <S.Container>
      <S.Header>
        <S.IconSuccess />
      </S.Header>
      <S.Content>
        <S.Title>Cadastro em Análise</S.Title>
        <S.Subtitle>
          Aguarde a confirmação do seu cadastro pelo GEA. Enviaremos um e-mail
          informando sobre a homologação do seus dados cadastrais.
        </S.Subtitle>

        <S.Button onPress={navigateToWelcomeAuth}>
          VOLTAR A TELA INICIAL
        </S.Button>
      </S.Content>
    </S.Container>
  );
};

export default WarningValidation;
