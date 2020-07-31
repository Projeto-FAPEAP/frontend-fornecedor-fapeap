import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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


  return (
    <Container>
      <ScrollView>

      
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
            <Button>
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
