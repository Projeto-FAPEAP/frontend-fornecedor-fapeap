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
  ListWrapperItem,
} from './styles';

const OrderDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { itemId } = route.params;
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
              <Title numberOfLines={1}>Consmidor Nome</Title>
              <SubTitle>Status: Pendente</SubTitle>
              <SubTitle>Tipo de Pedido: Delivery</SubTitle>
              <SubTitle>Endereço: Rua Dr.Braulino,1235</SubTitle>
            </ClientInformationTextWrapper>
            <ClientInformationButtonWrapper>
              <ButtonShareLocalization>
                <ButtonShareLocalizationIcon>
                  <Icon name="whatsapp" size={32} color="#fff" />
                </ButtonShareLocalizationIcon>

                <ButtonShareLocalizationText>
                  Compartilhar Endereço
                </ButtonShareLocalizationText>
              </ButtonShareLocalization>
            </ClientInformationButtonWrapper>
          </Span>
        </ClientInformation>
        <OrderInformation>
          <OrderRecipe>
            <ListWrapper>
              <FlatList
                scrollEnabled={false}
                horizontal
           
                ListFooterComponent={() => (
                  <View>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                    <ListWrapperItem>
                      <TotalText>Total</TotalText>
                      <TotalText>R$ 30.00</TotalText>
                    </ListWrapperItem>
                  </View>
                )}
                renderItem={({ item, index }) => (
                  <ListWrapperItem>
                    <TotalText>Total</TotalText>
                    <TotalText>R$ 30.00</TotalText>
                  </ListWrapperItem>
                )}
                keyExtractor={(index) => String(index.uri)}
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
              <TotalText>R$ 30.00</TotalText>
            </TotalSpan>
          </OrderRecipe>
          <ButtonWrapper>
            <Button onPress={()=>confirmOrder()}>
              <ButtonText>Confirmar Pedido</ButtonText>
            </Button>
            <ButtonCancel>
              <ButtonText>Cancelar Pedido</ButtonText>
            </ButtonCancel>
          </ButtonWrapper>
        </OrderInformation>
        </ScrollView>
    </Container>
  );
};

export default OrderDetails;
