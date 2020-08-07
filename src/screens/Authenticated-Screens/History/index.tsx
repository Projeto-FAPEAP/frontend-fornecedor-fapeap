import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import IsEmpty from '@components/IsEmpty';
import api from '@services/api';

import CardHistoryItem from './CardHistoryItem';

interface IResponse {
  id: string;
  total: string;
  tipo_da_compra: boolean;
  status_pedido: 'Finalizado' | 'Cancelado';
  consumidor: {
    nome: string;
  };
}

export interface IRequest {
  id: string;
  total: string;
  delivery: boolean;
  client: string;
  status_pedido: 'Finalizado' | 'Cancelado';
}

const History: React.FC = () => {
  const [requests, setRequest] = React.useState<IRequest[]>([]);

  React.useEffect(() => {
    api.get<IResponse[]>(`/fornecedor/pedidos/historico`).then((response) => {
      setRequest(
        response.data.map((item) => {
          const { id, total, tipo_da_compra, status_pedido } = item;
          const { nome } = item.consumidor;

          return {
            id,
            total,
            delivery: tipo_da_compra,
            client: nome,
            status_pedido,
          };
        }),
      );
    });
  }, []);

  const hasRequest = React.useMemo(() => {
    return requests.length > 0;
  }, [requests]);

  if (!hasRequest) {
    return (
      <IsEmpty icon="exclamationcircleo">
        Parece que você não possui pedidos no histórico
      </IsEmpty>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={requests}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item: request }) => <CardHistoryItem request={request} />}
    />
  );
};

export default History;
