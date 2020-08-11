import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../../contexts/auth';
import ProductContext from '../../../contexts/product';
import api from '../../../services/api';
import formatPrice from '../../../utils/formatPrice';
import Loader from '../../utils/index';
import {
  Container,
  ListWrapper,
  ListRowTitle,
  ListRowSubTitle,
  SearchWrapper,
  AddButton,
  AddButtonText,
  ListProducts,
  ListProductsImageWrapper,
  ListProductsTextWrapper,
  SearchTextInner,
  SearchInputButton,
} from './styles';

// import * as S from './styles';
interface IProducts {
  id: string;
  nome: string;
  preco: string;
  status_produto: number;
  estoque_produto: number;
  unidade_medida: string | number;
}
const Products: React.FC = () => {
  const navigation = useNavigation();
  /*  const [loading, setLoading] = useState(false); */
  const [productsList, setProductsList] = useState<IProducts[] | undefined>([]);
  const { user } = useContext(AuthContext);
  const { productList, getAllProducts, loading } = useContext(ProductContext);
  useEffect(() => {
    setTimeout(function () {
      getAllProducts();
    }, 1000);
  }, []);

  /*   function handleMeasurement(data: Array<Products>): void {
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
  }

  async function getAllProducts(): Promise<void> {
    setLoading(true);
    console.log(user.id,'teste')
    try {
      const response = await api.get(`${api.defaults.baseURL}/produto/${user.id}`);
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
  } */
  return (
    <Container>
      {!loading ? (
        <View>
          <SearchWrapper>
            <SearchInputButton
              onPress={() => navigation.navigate('SearchProduct')}
            >
              <SearchTextInner>Buscar Produto</SearchTextInner>
            </SearchInputButton>
            <AddButton
              onPress={() => {
                navigation.navigate('AddProduct');
              }}
            >
              <AddButtonText>Adicionar</AddButtonText>
            </AddButton>
          </SearchWrapper>

          <ListWrapper
            scrollEnabled
            data={productList}
            refreshing={false}
            onRefresh={() => getAllProducts()}
            renderItem={({ item, index }) => (
              <ListProducts
                onPress={() =>
                  navigation.navigate('EditProduct', {
                    itemId: (item as IProducts).id,
                  })
                }
              >
                <ListProductsImageWrapper
                  source={require('../../../assets/acai_1.jpg')}
                  resizeMode="contain"
                />
                <ListProductsTextWrapper>
                  <ListRowTitle>{(item as IProducts).nome}</ListRowTitle>
                  <ListRowSubTitle>
                    {`${(item as IProducts).unidade_medida} • ${formatPrice(
                      parseFloat((item as IProducts).preco),
                    )}`}
                  </ListRowSubTitle>
                  {(item as IProducts).status_produto ? (
                    <ListRowSubTitle>
                      <Icon name="check-circle" color="green" size={20} />
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
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </Container>
  );
};

export default Products;
