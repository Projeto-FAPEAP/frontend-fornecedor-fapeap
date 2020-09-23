import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Alert, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ButtonRefresh from '@components/ButtonRefresh';
import IsEmpty from '@components/IsEmpty';
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
  EmptyView,
  ButtonReload,
} from './styles';

// import * as S from './styles';
interface IProducts {
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
  /*  const [loading, setLoading] = useState(false); */

  const { user } = useContext(AuthContext);
  const { productList, getAllProducts, loading, isUpdate } = useContext(
    ProductContext,
  );
  useEffect(() => {
    setTimeout(function () {
      getAllProducts();
    }, 1000);
  }, []);

  return (
    <Container>
      {!loading ? (
        <View style={{ flex: 1 }}>
          <ButtonReload onPress={() => getAllProducts()}>
            <Icon name="refresh" />
          </ButtonReload>
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
          {!loading && productList?.length === 0 ? (
            <EmptyView>
              <IsEmpty icon="exclamationcircleo">
                Parece que você não possui produtos cadastrados
              </IsEmpty>
              <ButtonRefresh onPress={() => getAllProducts()} />
            </EmptyView>
          ) : (
            <View style={{ flex: 1 }}>
              <ListWrapper
                scrollEnabled
                data={productList}
                extraData={isUpdate}
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
                      source={{
                        uri: (item as IProducts).arquivos[0].url,
                      }}
                      resizeMode="cover"
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
          )}
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </Container>
  );
};

export default Products;
