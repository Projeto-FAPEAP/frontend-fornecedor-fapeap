import React from 'react';

import formatPrice from '@utils/formatPrice';
import { useTheme } from 'styled-components';

import { IRequest } from '../index';
import * as S from './styles';
import { useNavigation,useRoute } from '@react-navigation/native';
interface CardHistoryItemProps {
  request: IRequest;
  page:string;
}

const CardHistoryItem: React.FC<CardHistoryItemProps> = (props) => {
  const { request,page } = props;
  
  const { colors } = useTheme();
  const navigation =  useNavigation();
  const statusColor = React.useMemo(() => {
    if (request.status_pedido === 'Finalizado') return colors.success;

    return colors.warning;
  }, [colors.success, colors.warning, request.status_pedido]);

  const statusIcon = React.useMemo(() => {
    if (request.status_pedido === 'Finalizado') return 'checkcircleo';

    return 'closecircleo';
  }, [request.status_pedido]);

  const formattedPrice = React.useMemo(() => {
    return formatPrice(Number(request.total));
  }, [request.total]);
  function onPress(){
    
    navigation.navigate(page,{
      itemId:request.id,
      extraData:{
        name:request.client,
        status:request.status_pedido,
        delivery: request.delivery,
        address:request.logradouro+''+request.numero_local,
        total: request.total,
        date:request.created_at,
        subtotal:request.subtotal,
        tax:request.taxa_entrega
      }
    })
  }

  return (
    <S.CardItem onPress={()=>onPress()}>
      <S.IConStatus color={statusColor} name={statusIcon} size={25} />
      <S.NameClient>{request.client}</S.NameClient>
      <S.Sale>
        {formattedPrice} • {request.delivery ? 'Delivery' : 'Retirado no local'}
      </S.Sale>
      <S.Status color={statusColor}>{request.status_pedido}</S.Status>
    </S.CardItem>
  );
};

export default React.memo(CardHistoryItem);
