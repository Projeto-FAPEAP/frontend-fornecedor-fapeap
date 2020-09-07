import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useTheme } from 'styled-components';

export default function Icone(type) {
  const { colors } = useTheme();

  return (
    <Icon
      name={
        type === 'Finalizado' ||
        type === 'Reserva confirmada' ||
        type == 'Delivery confirmado'
          ? 'check-circle'
          : type == 'Pedido em rota de entrega'
          ? 'truck'
          : type == 'Pendente'
          ? 'clock-o'
          : 'close'
      }
      style={{ marginRight: 10 }}
      size={30}
      color={
        type === 'Finalizado' ||
        type === 'Reserva confirmada' ||
        type == 'Delivery confirmado' ||
        type == 'Pedido em rota de entrega'
          ? colors.primary
          : colors.primary
      }
    />
  );
}
