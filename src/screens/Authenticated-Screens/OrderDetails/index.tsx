import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import ImagePicker, {
  ImagePickerResponse,
  ImagePickerOptions,
} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Container,
  Header,
  BackButtonWrapper,
  HeaderTextWrapper,
  HeaderText,
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
  const [delivery, setDelivery] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  // const [pictures, setPictures] = useState([5]);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const [photoList, setPhotoList] = useState<ImagePickerResponse[]>([]);
  const [video, setVideo] = useState({});
  const [videoSelected, setVideoSelected] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showOrders, setShowOrders] = useState(true);

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Header>
          <BackButtonWrapper>
            <Icon color="#FFF" size={28} name="chevron-left" />
          </BackButtonWrapper>
          <HeaderTextWrapper>
            <HeaderText>Detalhes Pedidos</HeaderText>
          </HeaderTextWrapper>
        </Header>
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
                data={photoList}
                extraData={extraPhoto}
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
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default OrderDetails;
