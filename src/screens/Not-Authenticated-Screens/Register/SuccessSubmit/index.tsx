import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

const SuccessSubmit: React.FC = () => {
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
        <S.Title>Cadastro finalizado</S.Title>
        <S.Subtitle>
          Agora será necessário aguardar até 7 dias, para confirmarmos seus
          dados cadastrados.
        </S.Subtitle>
        <S.Subtitle>
          Não se preocupe, entraremos em contato em breve, por email.
        </S.Subtitle>

        <S.Button onPress={navigateToWelcomeAuth}>
          VOLTAR A TELA INICIAL
        </S.Button>
      </S.Content>
    </S.Container>
  );
};

export default SuccessSubmit;
