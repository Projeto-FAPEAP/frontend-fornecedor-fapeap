import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../services/api';
import { useNavigation,useRoute, NavigationContainer } from '@react-navigation/native';
import Loader from '../../utils/index';
import {
  Container,
  ClientInformation,
  ClientInformationImageWrapper,
  ClientInformationImage,
  Span,
  ClientInformationTextWrapper,
  ClientInformationButtonWrapper,
  Title,
  SubTitle,
  ButtonShareLocalization,
  ButtonShareLocalizationText,
  ButtonShareLocalizationIcon,
  OrderRecipe,
  Button,
  ButtonText,
  ButtonWrapper,
  ButtonCancel,
  OrderInformation,
  TotalSpan,
  TotalText,
  SubTotalSpan,
  SubTotalText,
  SubTotalSpanInner,
  ListWrapper,
  ListWrapperItem,ListWrapperInner,Amount
} from './styles';

interface Items{
  id:number;
  preco_venda:string;
  quantidade:string;
  produto:{
    nome:string;
    preco:string;
  }
}

const OrderDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [itemsList,setItemList] = useState<Items[] | undefined>([]);
  const { itemId } = route.params;
  const {extraData} = route.params;

  useEffect(()=>{
    getAllItems();
  },[])

  async function confirmOrder():Promise<void>{
    try{
      const response = await api.put(`${api.defaults.baseURL}/validarpedidos/${itemId}`)
      console.log(JSON.stringify(response.data, null, 2));
  
    
      setLoading(false);
      
      Alert.alert('Aviso', 'Pedido Confirmado!',[{
        text: 'Ok',
        onPress: () => navigation.navigate('Index'),
        style: 'default',
      },]);
    }catch(error){
      setLoading(false);
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

  async function getAllItems(): Promise<void> {
    setLoading(true);
    console.log(itemId)
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/fornecedor/pedidos/itens/${itemId}`,
      );
      
        
      setItemList(response.data)


      setLoading(false);
      console.log(JSON.stringify(response.data,null,2));
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

  async function cancelOrder():Promise<void>{
    try{
      const response = await api.put(`${api.defaults.baseURL}/cancelarpedidos/${itemId}`)
      console.log(JSON.stringify(response.data, null, 2));
  
    
      setLoading(false);
      
      Alert.alert('Aviso', 'Pedido Cancelado!',[{
        text: 'Ok',
        onPress: () => navigation.navigate('Index'),
        style: 'default',
      },]);
    }catch(error){
      setLoading(false);
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

  return (
    <Container>
      <ScrollView>
        <Loader loading={loading} />
      
        <ClientInformation>
          <ClientInformationImageWrapper>
            <ClientInformationImage
              source={require('../../../assets/Order.png')}
              resizeMode="contain"
            />
          </ClientInformationImageWrapper>
          <Span>
            <ClientInformationTextWrapper>
              <Title numberOfLines={1}>{extraData.name}</Title>
              <SubTitle>{`Status: ${extraData.status}`}</SubTitle>
              <SubTitle>{`Tipo de Pedido: ${extraData.delivery?'Delivery':'Reserva'}`}</SubTitle>
              <SubTitle>{`Endereço: ${extraData.address}`}</SubTitle>
            </ClientInformationTextWrapper>
            <ClientInformationButtonWrapper>
            {extraData.status !== 'Pendente'?(
             <ButtonShareLocalization>
             <ButtonShareLocalizationIcon>
               <Icon name="whatsapp" size={32} color="#fff" />
             </ButtonShareLocalizationIcon>

             <ButtonShareLocalizationText>
               Compartilhar Endereço
             </ButtonShareLocalizationText>
           </ButtonShareLocalization>
            ):null}
              
            </ClientInformationButtonWrapper>
          </Span>
        </ClientInformation>
        <OrderInformation>
          <OrderRecipe>
            <ListWrapper>
              <FlatList
                scrollEnabled={false}
               
           data={itemsList}
                
                renderItem={({ item, index }) => (
                  <ListWrapperItem>
                    <ListWrapperInner>
                      <TotalText>{item.produto.nome}</TotalText>
                      <TotalText> {`R$ ${item.preco_venda}`}</TotalText>
                    </ListWrapperInner>
                    <Amount>
                      {`Quantidade: ${item.quantidade}`}
                    </Amount>
                  </ListWrapperItem>
                )}
                keyExtractor={(item, index) => String(index)}
              />
            </ListWrapper>
            <SubTotalSpan>
              <SubTotalSpanInner>
                <SubTotalText>Taxa de Entrega</SubTotalText>
                <SubTotalText>R$ 8.50</SubTotalText>
              </SubTotalSpanInner>
              <SubTotalSpanInner>
                <SubTotalText>SubTotal</SubTotalText>
                <SubTotalText>R$ 8.50</SubTotalText>
              </SubTotalSpanInner>
            </SubTotalSpan>
            <TotalSpan>
              <TotalText>Total</TotalText>
              <TotalText>{`R$ ${extraData.total}`}</TotalText>
            </TotalSpan>
          </OrderRecipe>
          <ButtonWrapper>
            {extraData.status === 'Pendente'?(
              <Button onPress={()=>confirmOrder()}>
              <ButtonText>Confirmar Pedido</ButtonText>
            </Button>
            ):null}
            
            <ButtonCancel onPress={()=>cancelOrder()}>
              <ButtonText>Cancelar Pedido</ButtonText>
            </ButtonCancel>
          </ButtonWrapper>
        </OrderInformation>
        </ScrollView>
    </Container>
  );
};

export default OrderDetails;