import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Alert, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import IsEmpty from '@components/IsEmpty';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../../contexts/auth';
import api from '../../../services/api';
import Loader from '../../utils/index';
import {
  Container,
  ListRowTitle,
  ListRowSubTitle,
  SearchInput,
  ListProducts,
  ListProductsImageWrapper,
  ListProductsTextWrapper,
  HeaderSearchProduct,
  ListWrapperSearchProduct,
  NothingFound,
} from './styles';

// import * as S from './styles';
interface Products {
  id: string;
  nome: string;
  preco: string;
  status_produto: number;
  estoque_produto: number;
  unidade_medida: string | number;
  arquivos: [{ url: string }];
}
const Products: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [productsList, setProductsList] = useState<Products[] | undefined>([]);
  const [productsListResult, setProductsListResult] = useState<
    Products[] | undefined
  >([]);
  const [search, setSearch] = useState('');
  const [found, setFound] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getAllProducts();
  }, []);

  function handleMeasurement(data: Array<Products>): void {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].unidade_medida === '1') {
        data[i].unidade_medida = '1 kg';
      } else if (data[i].unidade_medida === '2') {
        data[i].unidade_medida = '1 Litro';
      } else if (data[i].unidade_medida === '3') {
        data[i].unidade_medida = '500 gramas';
      } else if (data[i].unidade_medida === '4') {
        data[i].unidade_medida = '500 ml';
      }
    }
    setProductsList(data);
    setProductsListResult(data);
  }

  async function getAllProducts(): Promise<void> {
    setLoading(true);
    console.log(user!.id, 'teste');
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/produto/${user!.id}`,
      );
      handleMeasurement(response.data);
      setLoading(false);
      console.log(loading);
    } catch (error) {
      setLoading(false);
      if (error.message === 'Network Error') {
        Alert.alert('Verifique sua conexão de internet e tente novamente!!');
      } else {
        console.log(JSON.stringify(error, null, 2));
        console.log(error, 'jonathan');
        console.log(Object(error.response), 'salve');
        Alert.alert(error.response.data.error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      }
    }
  }

  function handleSearch(): void {
    const aux: Products[] = [];
    let k = 0;
    for (let i = 0; i < productsList!.length; i += 1) {
      if (productsList![i].nome.match(`^${search}`)) {
        console.log(i, productsList![i].nome);

        aux[k] = productsList![i];
        k += 1;
        console.log(JSON.stringify(aux[i], null, 2));
      }
    }
    if (aux.length === 0) {
      setFound(true);
      setProductsListResult(aux);
    } else {
      setFound(false);
      setProductsListResult(aux);
    }
    console.log(aux.length);
  }

  useEffect(() => {
    if (search !== '') {
      handleSearch();
    } else {
      setFound(false);
      setProductsListResult(productsList);
    }
  }, [search]);
  return (
    <>
      <Container>
        {!loading ? (
          <View style={{ flex: 1 }}>
            {!loading && productsList?.length === 0 ? (
              <IsEmpty icon="exclamationcircleo">
                Parece que você não possui produtos cadastrados
              </IsEmpty>
            ) : (
              <View>
                <HeaderSearchProduct>
                  <SearchInput
                    autoFocus
                    onChangeText={(text) => setSearch(text)}
                    placeholder="Buscar Produto"
                  />
                </HeaderSearchProduct>
                {found ? <NothingFound>Nada encontrado!</NothingFound> : null}
                <ListWrapperSearchProduct>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={productsListResult}
                    refreshing={false}
                    onRefresh={() => getAllProducts()}
                    renderItem={({ item, index }) => (
                      <ListProducts
                        onPress={() =>
                          navigation.navigate('EditProduct', {
                            itemId: item.id,
                          })
                        }
                      >
                        <ListProductsImageWrapper
                          source={{
                            uri: item.arquivos[0].url,
                          }}
                          resizeMode="cover"
                        />
                        <ListProductsTextWrapper>
                          <ListRowTitle>{item.nome}</ListRowTitle>
                          <ListRowSubTitle>
                            {`${item.unidade_medida} R$ ${item.preco}`}
                          </ListRowSubTitle>
                          {item.status_produto ? (
                            <ListRowSubTitle>
                              <Icon
                                name="check-circle"
                                color="green"
                                size={20}
                              />
                              {' ' + 'Disponivel'}
                            </ListRowSubTitle>
                          ) : (
                            <ListRowSubTitle>
                              <Icon name="ban" color="red" size={20} />
                              {' ' + 'Indisponivel'}
                            </ListRowSubTitle>
                          )}
                        </ListProductsTextWrapper>
                      </ListProducts>
                    )}
                    keyExtractor={(item, index) => String(index)}
                  />
                </ListWrapperSearchProduct>
              </View>
            )}
          </View>
        ) : (
          <Loader loading={loading} />
        )}
      </Container>
    </>
  );
};

export default Products;
