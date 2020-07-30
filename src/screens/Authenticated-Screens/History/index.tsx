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
  Title,
  Input,
  RetrievePasswordButton,
  RetrievePasswordText,
  Form,
  Header,
  RegisterButton,
  RegularText,
  RegisterButtonText,
  P,
  BackButtonWrapper,
  Footer,
  Dropdown,
  DropdownWrappeer,
  MediaSpot,
  MediaSpotButton,
  WrapperList,
  AddMediaButtonWrapper,
  RemoveMediaButtonWrapper,
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
} from './styles';

const History: React.FC = () => {
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
      <Header>
        <SearchInput placeholder="Buscar Histórico" />
      </Header>
      <ListWrapper>
        <FlatList
          ListFooterComponent={() => (
            <View style={{ backgroundColor: '#F2F1F7' }}>
              <ListRow>
                <ListRowTitle>Nome do cliente</ListRowTitle>
                <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
              </ListRow>
              <ListRow>
                <ListRowTitle>Nome do cliente</ListRowTitle>
                <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
              </ListRow>
              <ListRow>
                <ListRowTitle>Nome do cliente</ListRowTitle>
                <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
              </ListRow>
              <ListRow>
                <ListRowTitle>Nome do cliente</ListRowTitle>
                <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
              </ListRow>
              <ListRow>
                <ListRowTitle>Nome do cliente</ListRowTitle>
                <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
              </ListRow>
              <ListRow>
                <ListRowTitle>Nome do cliente</ListRowTitle>
                <ListRowSubTitle>Total: R$25.00</ListRowSubTitle>
                <ListRowSubTitle>Status: Pendente</ListRowSubTitle>
                <ListRowSubTitle>Tipo de Pedido: Delivery</ListRowSubTitle>
              </ListRow>
            </View>
          )}
          renderItem={({ item, index }) => (
            <MediaSpotButton onPress={() => removePhoto(index)}>
              <RemoveMediaButtonWrapper source={item} resizeMode="contain">
                <Icon color="#EA3232" size={35} name="trash-o" />
              </RemoveMediaButtonWrapper>
            </MediaSpotButton>
          )}
          keyExtractor={(index) => String(index.uri)}
        />
      </ListWrapper>
    </Container>
  );
};

export default History;
