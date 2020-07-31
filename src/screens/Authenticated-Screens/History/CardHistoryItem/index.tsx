import React from 'react';

import { useTheme } from 'styled-components';

import * as S from './styles';

const CardHistoryItem: React.FC = () => {
  const { colors } = useTheme();

  const statusColor = React.useMemo(() => {
    return colors.warning;
  }, [colors.warning]);

  return (
    <S.CardItem>
      <S.IConStatus color={statusColor} name="minuscircleo" size={25} />
      <S.NameClient>Manoel Gomes Borges</S.NameClient>
      <S.Sale>R$25.00 • Delivery</S.Sale>
      <S.Status color={statusColor}>Pendente</S.Status>
    </S.CardItem>
  );
};

export default React.memo(CardHistoryItem);
