import React from 'react';

import formatPrice from '@utils/formatPrice';
import { useTheme } from 'styled-components';

import { IRequest } from '../index';
import * as S from './styles';

interface CardHistoryItemProps {
  request: IRequest;
}

const CardHistoryItem: React.FC<CardHistoryItemProps> = (props) => {
  const { request } = props;
  const { colors } = useTheme();

  const statusColor = React.useMemo(() => {
    if (request.status_pedido === 'Finalizado') return colors.success;

    return colors.warning;
  }, [colors.success, colors.warning, request.status_pedido]);

  const formattedPrice = React.useMemo(() => {
    return formatPrice(Number(request.total));
  }, [request.total]);

  return (
    <S.CardItem>
      <S.IConStatus color={statusColor} name="checkcircleo" size={25} />
      <S.NameClient>Manoel Gomes Borges</S.NameClient>
      <S.Sale>
        {formattedPrice} • {request.delivery ? 'Delivery' : 'Retirado no local'}
      </S.Sale>
      <S.Status color={statusColor}>{request.status_pedido}</S.Status>
    </S.CardItem>
  );
};

export default React.memo(CardHistoryItem);
