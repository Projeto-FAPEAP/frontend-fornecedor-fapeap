import React, { useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import * as S from './styles';

interface IParams {
  status_validation: number;
}
const WarningValidation: React.FC = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const routeParams = params as IParams;
  const navigateToWelcomeAuth = useCallback(() => {
    navigate('Login');
  }, [navigate]);

  return (
    <S.Container>
      <S.Header>
        <S.IconSuccess />
      </S.Header>
      <S.Content>
        {routeParams.status_validation === 0 ? (
          <S.Title>Cadastro em Análise</S.Title>
        ) : (
          <S.Title>Cadastro não Aprovado</S.Title>
        )}
        {routeParams.status_validation === 0 ? (
          <S.Subtitle>
            Aguarde a confirmação do seu cadastro pelo GEA. Enviaremos um e-mail
            informando sobre a homologação do seus dados cadastrais.
          </S.Subtitle>
        ) : (
          <S.Subtitle>
            Seu cadastro possui pendências para aprovação. Por gentileza, entre
            em contato com o órgão responsável para mais informações.
          </S.Subtitle>
        )}

        <S.Button onPress={navigateToWelcomeAuth}>
          VOLTAR A TELA INICIAL
        </S.Button>
      </S.Content>
    </S.Container>
  );
};

export default WarningValidation;
