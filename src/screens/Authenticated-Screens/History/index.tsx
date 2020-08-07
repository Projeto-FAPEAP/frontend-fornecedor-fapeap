import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import IsEmpty from '@components/IsEmpty';
import api from '@services/api';

import CardHistoryItem from './CardHistoryItem';

interface IResponse {
  data: {
    id: string;
    total: string;
    delivery?: boolean;
    status_pedido: 'Finalizado' | 'Cancelado';
    consumidor: {
      nome: string;
    };
  }[];
  page: number;
  perPage: number;
  pages: number;
  total: number;
}

export interface IRequest {
  id: string;
  total: string;
  delivery?: boolean;
  client: string;
  status_pedido: 'Finalizado' | 'Cancelado';
}

const History: React.FC = () => {
  const [requests, setRequest] = React.useState<IRequest[]>([]);
  const [page, setPage] = React.useState(1);

  const findRequestPerPage = React.useCallback(async (nextPage: number) => {
    const response = await api.get<IResponse>(`/fornecedor/pedidos/historico`, {
      params: {
        page: nextPage,
        limit: 30,
      },
    });

    const { data } = response.data;

    setRequest(
      data.map((item) => {
        const { id, total, delivery, status_pedido } = item;
        const { nome } = item.consumidor;

        return {
          id,
          total,
          delivery: !!delivery,
          client: nome,
          status_pedido,
        };
      }),
    );

    setPage(response.data.page);
  }, []);

  React.useEffect(() => {
    findRequestPerPage(1);
  }, [findRequestPerPage]);

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
