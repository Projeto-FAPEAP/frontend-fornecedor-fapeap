import React, { useState, useEffect } from 'react';
import {FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import Loader from '../../utils/index';
import {
    Container,
    Title,
    Input,
    P,
    DropdownWrappeer,
    WelcomeText,
    TopTabMenu,
    OrderButton,
    ProductsButton,
    TopTabMenuTextActived,
    TopTabMenuTextInActived,
    TopTabMenuInWrapper,
    Section,
    SectionTitle,
    ListRow,
    ListWrapper,
    ListRowTitle,
    ListRowSubTitle,
    SearchInput,
    SearchWrapper,
    AddButton,
    AddButtonText,
    ListProducts,
    ListProductsImageWrapper,
    ListProductsTextWrapper,
    ModalBackground,
    FormAddProduct,
    HeaderAddProduct,
    HeaderAddProductInnerTitle,
    HeaderAddProductInnerIcon,
    AddProductButton,
    AddProductButtonText,
    WrapperListAddProduct,
    MediaSpotButtonAddProduct,
    AddMediaButtonWrapperAddProduct,
    CloseButtonAddProduct,
    MediaWrapper,
    RemoveMedia,
    RemoveMediaButtonWrapper,
    RemoveProductButton,
    WrapperButtons,
    ListWrapperOrders,
    FormSearchProduct,
    SearchTextInner,
    SearchInputButton,
    HeaderSearchProductInnerSearch,
    HeaderSearchProductInnerIcon,
    HeaderSearchProduct,
    ListWrapperSearchProduct,
    ModalBackgroundSearch,

} from './styles';

// import * as S from './styles';
interface Products {
  id: string;
  nome: string;
  preco: string;
  status_produto: number;
  estoque_produto: number;
  unidade_medida: string | number;
}
const Products: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [productsList, setProductsList] = useState<Products[] | undefined>([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setTimeout(function () {

      getAllProducts();
    }, 1000);
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
  }

  async function getAllProducts(): Promise<void> {
    setLoading(true);
    try {
      const response = await api.get(`${api.defaults.baseURL}/produto`);
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
    /* const orderList = ordersData; */
  }

  useEffect(() => {
    if (search !== '') {
      handleSearch();
    }
  }, [search]);
  return (
    <>
      <Container>
        <Loader loading={loading}/>
       
             
                <HeaderSearchProduct>
                  <HeaderSearchProductInnerSearch>
                    <SearchInput
                      onChangeText={(text) => setSearch(text)}
                      placeholder="Buscar Produto"
                    />
                  </HeaderSearchProductInnerSearch>
                </HeaderSearchProduct>

                <ListWrapperSearchProduct>
                  <FlatList
                    scrollEnabled={false}
                    data={productsList}
                    refreshing={false}
                    onRefresh={() => getAllProducts()}
                    renderItem={({ item, index }) => (
                      <ListProducts onPress={() => getProduct(item.id)}>
                        <ListProductsImageWrapper
                          source={require('../../../assets/acai_1.jpg')}
                          resizeMode="contain"
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
            
          
        
        </Container>
    </>
  );
};

export default Products;
