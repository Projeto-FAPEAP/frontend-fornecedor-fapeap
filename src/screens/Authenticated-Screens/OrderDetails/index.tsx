import React, { useState, useEffect, useRef, useLayoutEffect,useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image,ScrollView,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../services/api';
import { useNavigation,useRoute, NavigationContainer } from '@react-navigation/native';
import Loader from '../../utils/index';
import { 
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
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
  ListWrapperItem,ListWrapperInner,Amount,ListRowConfirmed,ListRowPending
} from './styles';
import OrderContext from '../../../contexts/order';

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
  const {getAllOrders} = useContext(OrderContext);
  useEffect(()=>{
    getAllItems();
  },[])

  async function confirmOrder():Promise<void>{
    setLoading(true)
    try{
      const response = await api.put(`${api.defaults.baseURL}/validarpedidos/${itemId}`)
      console.log(JSON.stringify(response.data, null, 2));
  
    
      setLoading(false);
      
      getAllOrders().then(
        (response)=>{
          Alert.alert('Aviso','Pedido Confirmado!!',[{
            text: 'Ok',
            onPress: () => navigation.navigate('Index'),
            style: 'default',
          },]);
        }
      )
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
      
     /*  const a = [
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        
        {
          total: '35.63',
          status_pedido: 'Pendente',
          tipo_da_compra: false,
          produto: {
            nome: 'teste',
          },
        },
        
      ]; */
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
    setLoading(true)
    try{
      const response = await api.put(`${api.defaults.baseURL}/cancelarpedidos/${itemId}`)
      console.log(JSON.stringify(response.data, null, 2));
  
    
      setLoading(false);
      
      getAllOrders().then(
        (response)=>{
          Alert.alert('Aviso','Pedido Cancelado!!',[{
            text: 'Ok',
            onPress: () => navigation.navigate('Index'),
            style: 'default',
          },]);
        }
      )
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

   async function sendingOrder():Promise<void>{
    setLoading(true)
    try{
      const response = await api.put(`${api.defaults.baseURL}/validarpedidos/${itemId}`)
      console.log(JSON.stringify(response.data, null, 2));
  
    
      setLoading(false);
      
      getAllOrders().then(
        (response)=>{
          Alert.alert('Aviso','O cliente foi informado que o entregador está a caminho!!',[{
            text: 'Ok',
            onPress: () => navigation.navigate('Index'),
            style: 'default',
          },]);
        }
      )
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
      
{/* <ScrollView> */}


      
        <Loader loading={loading} />
      
        <ClientInformation>
          {/* <ClientInformationImageWrapper>
            <ClientInformationImage
              source={require('../../../assets/Order.png')}
              resizeMode="contain"
            />
          </ClientInformationImageWrapper> */}
          <Span>
            <ClientInformationTextWrapper>
              <Title numberOfLines={1}>{extraData.name}</Title>
              
              
              <SubTitle>{extraData.address}</SubTitle>
              <SubTitle>{format(
                         Date.parse(extraData.date), 
                          "'Dia' dd 'de' MMMM', às ' HH:mm'h'",{ locale: pt }
                        )}</SubTitle>
            </ClientInformationTextWrapper>
            <ClientInformationButtonWrapper>
            {extraData.status === 'Pendente'?(
              <ListRowPending>{extraData.status}</ListRowPending>):(
              <ListRowConfirmed>{extraData.status}</ListRowConfirmed>)}
            {extraData.status !== 'Pendente' && extraData.delivery?(
             <ButtonShareLocalization onPress={()=>{Linking.canOpenURL(`whatsapp://send?text=${extraData.address}`).then((response)=>response?Linking.openURL(`whatsapp://send?text=${extraData.address}`):Alert.alert('Aviso','Instale o whatsapp para utilizar esta função!!'))}}>
             <ButtonShareLocalizationIcon>
               <Icon name="whatsapp" size={18} color="#fff" />
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
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
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
                <SubTotalText>{extraData.delivery? extraData.tax:'0.00' }</SubTotalText>
              </SubTotalSpanInner>
              <SubTotalSpanInner>
                <SubTotalText>SubTotal</SubTotalText>
                <SubTotalText>{extraData.subtotal}</SubTotalText>
              </SubTotalSpanInner>
            </SubTotalSpan>
            <TotalSpan>
              <TotalText>Total</TotalText>
              <TotalText>{`R$ ${extraData.total}`}</TotalText>
            </TotalSpan>
          </OrderRecipe>
          
        </OrderInformation>
        
            {extraData.status === 'Pendente'?(
             <ButtonWrapper>
                <Button onPress={()=>confirmOrder()}>
                    <ButtonText>Confirmar Pedido</ButtonText>
                </Button>
                <ButtonCancel onPress={()=>cancelOrder()}>
                  <ButtonText>Cancelar Pedido</ButtonText>
                </ButtonCancel>
                </ButtonWrapper>

              
            ):null}
            {extraData.status === 'Pedido em rota de entrega' || extraData.status === 'Pendente' && extraData.delivery === true?(
              null
            ):(
              <ButtonWrapper>
<Button onPress={()=>sendingOrder()}>
              <ButtonText>Entregador a caminho</ButtonText>
            </Button>
            </ButtonWrapper>
            )}
            
       {/*  </ScrollView> */}
    </Container>
  );
};

export default OrderDetails;