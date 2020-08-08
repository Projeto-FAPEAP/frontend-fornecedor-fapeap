import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import IsEmpty from '@components/IsEmpty';
import Loading from '@components/Loading';
import api from '@services/api';

import CardHistoryItem from './CardHistoryItem';
import { ItemDocument } from '@screens/Not-Authenticated-Screens/Register/FormStep4/styles';

interface IResponse {
  historico: {
    id: string;
    total: string;
    delivery?: boolean;
    subtotal:number;
    taxa_entrega:number;
    created_at:string;
    status_pedido: 'Finalizado' | 'Cancelado';
    consumidor: {
      nome: string;
      logradouro:string;
      numero_local:string;
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
  subtotal:number;
  taxa_entrega:number;
  created_at:string;
  logradouro:string;
  numero_local:string
}

const History: React.FC = () => {
  const [requests, setRequest] = React.useState<IRequest[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const findRequestPerPage = React.useCallback(async (nextPage: number) => {
    const response = await api.get<IResponse>(`/fornecedor/pedidos/historico`, {
      params: {
        page: nextPage,
        limit: 30,
      },
    });

    const { historico: data } = response.data;

    setRequest(
      data.map((item) => {
        const { id, total, delivery, status_pedido,subtotal, taxa_entrega,created_at} = item;
        const { nome,logradouro,numero_local } = item.consumidor;

        return {
          id,
          total,
          delivery: !!delivery,
          client: nome,
          status_pedido,
          logradouro,
          numero_local,
          subtotal,
          taxa_entrega,
          created_at
        };
      }),
    );

    setPage(response.data.page);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    findRequestPerPage(1);
  }, [findRequestPerPage]);

  const hasRequest = React.useMemo(() => {
    return requests.length > 0;
  }, [requests]);

  if (loading) {
    return <Loading />;
  }

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
      renderItem={({ item: request }) => <CardHistoryItem request={request} page={'HistoryDetails'}  />}
    />
  );
};

export default History;
