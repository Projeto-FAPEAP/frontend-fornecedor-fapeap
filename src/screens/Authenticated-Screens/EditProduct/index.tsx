import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation,useRoute, NavigationContainer } from '@react-navigation/native';
import api from '../../../services/api';
import Loader from '../../utils/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';

import {
    Container,
    Input,
    P,
    DropdownWrappeer,
    ModalBackground,
    FormAddProduct,
    AddProductButton,
    AddProductButtonText,
    WrapperListAddProduct,
    MediaSpotButtonAddProduct,
    AddMediaButtonWrapperAddProduct,
    MediaWrapper,
    RemoveMedia,
    RemoveMediaButtonWrapper,
    RemoveProductButton,
    WrapperButtons,

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
const AddProducts: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { itemId } = route.params;
    const [extraPhoto, setExtraPhoto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [itemsNumber, setItemsNumber] = useState('');
    const [availability, setAvailability] = useState(0);
    const [measurement, setMeasurement] = useState(0);
    const [productphotoList, setProductphotoList] = useState<
      ImagePickerResponse[]
    >([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [learning, setLearning] = useState(false);
    useEffect(()=>{
      getProduct(itemId)
    },[])

    function removePhoto(index: number): void {
        // Alert.alert('Jonathan');
        Alert.alert(
          'Remover foto',
          'Quer mesmo remover?',
          [
            {
              text: 'Não',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: () => {
                const oldPhotosList = productphotoList;
                const newPhotoList = [];
                let j = 0;
                for (let i = 0; i < productphotoList.length; i += 1) {
                  if (i !== index) {
                    newPhotoList[j] = oldPhotosList[i];
                    j += 1;
                  }
                }
    
                setProductphotoList(newPhotoList);
                Alert.alert('Removido com Sucesso!');
              },
            },
          ],
          { cancelable: false },
        );
    }
    
    function learn(): void {
      setTimeout(function () {
        setLearning(false);
      }, 5000);
    }
    function handleChoosePhoto(): void {
      // Alert.alert('Jonathan');
      if (productphotoList.length < 2) {
        const photos = productphotoList;
        let Repeat = false;
        const options = {};
        ImagePicker.launchImageLibrary(options, (Response) => {
          if (Response.uri) {
            for (let i = 0; i < productphotoList.length; i += 1) {
              if (String(photos[i].uri) === Response.uri) {
                Repeat = true;
              }
            }
  
            if (Repeat) {
              Alert.alert(
                'Aviso',
                'Você já adicionou essa imagem, evite adicionar imagens repetidas!',
              );
            } else {
              photos.push(Object(Response));
  
              setProductphotoList(photos);
              setExtraPhoto(true);
              setLearning(true);
              learn();
              Alert.alert('Adicionado com Sucesso!');
              setExtraPhoto(false);
            }
          }
        });
      } else {
        Alert.alert(
          'Aviso',
          'Você chegou ao limite de fotos inseridas, caso queira adicionar novas, exclua alguma!',
        );
      }
    }
    async function deleteProduct(): Promise<void> {
      Alert.alert(
        'Remover Produto',
        'Quer mesmo remover?',
        [
          {
            text: 'Não',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              setLoading(true);
              console.log(selectedProduct, 'getr');
              try {
                const response = await api.delete(
                  `${api.defaults.baseURL}/produto/${selectedProduct}`,
                );
                
                
                setLoading(false);
                Alert.alert('Aviso','Removido com sucesso!!',[{
                  text: 'Ok',
                  onPress: () => navigation.navigate('Index'),
                  style: 'default',
                },]);

                // setProductphotoList(response[0].data.imagens)
              } catch (error) {
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
            },
          },
        ],
        { cancelable: false },
      );
    }

    async function editProduct(): Promise<void> {
      console.log(measurement, availability, 'coemço');
      if (
        productName === '' ||
        productPrice === '' ||
        itemsNumber === '' ||
        availability === 1 ||
        measurement === 1 ||
        productphotoList.length === 0
      ) {
        Alert.alert('Aviso', 'Preencha todos os campos!!');
      } else {
        setLoading(true);
        console.log(measurement, availability);
        const formData = new FormData();
  
        const photoListArray = productphotoList;
        /* const token = await AsyncStorage.getItem('@QueroAçaí-Fornecedor:token'); */
        /* console.log(token, 'Jonathan'); */
        const image = {};
        formData.append('nome', productName);
        formData.append('preco', productPrice);
        formData.append('estoque_produto', itemsNumber);
        formData.append('status_produto', availability);
  
        formData.append('unidade_medida', measurement);
        /*  for (let i = 0; i < productphotoList.length; i += 1) {
          image = {
            uri: photoListArray[i].uri,
            type: photoListArray[i].type,
            name: photoListArray[i].fileName,
          };
          formData.append('imagem', image);
        } */
        console.log(formData);
        try {
          const response = await api.put(
            `${api.defaults.baseURL}/produto/${selectedProduct}`,
            {
              nome: productName,
              preco: parseFloat(productPrice),
              status_produto: availability === 2,
              estoque_produto: itemsNumber,
              unidade_medida: measurement - 1,
            },
          );
          console.log(JSON.stringify(response.data, null, 2));
  
    
          setLoading(false);

          Alert.alert('Aviso','Atualizado com sucesso!!',[{
            text: 'Ok',
            onPress: () => navigation.navigate('Index'),
            style: 'default',
          },]);
        } catch (error) {
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
    }

    async function getProduct(idProduct: string): Promise<void> {
      setLoading(true);

      console.log(idProduct, 'getr');
      try {
        const response = await api.get(
          `${api.defaults.baseURL}/produto/${idProduct}`,
        );
        console.log(response.data.status_produto,'tedst')
        const available = response.data.status_produto ? 2 : 3;
        const Measurement = parseInt(response.data.unidade_medida) + 1;
        console.log(Measurement, 'hhhhhhhhhhhhhhhh');
        setProductName(response.data.nome);
        setProductPrice(response.data.preco);
        setAvailability(available);
        setMeasurement(parseInt(Measurement));
        setItemsNumber(response.data.estoque_produto.toString());
        setSelectedProduct(response.data.id);
        setLoading(false);
     
        console.log(JSON.stringify(response.data, null, 2));
        // setProductphotoList(response[0].data.imagens)
      } catch (error) {
        setLoading(false);
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
    <>
      <Container>
        <Loader loading={loading}/>
        <KeyboardAwareScrollView>
              <ModalBackground>
                <FormAddProduct>
                  <Input
                    placeholder="Nome do Produto"
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                  />
                  <Input
                    placeholder="Preço do Produto"
                    value={productPrice}
                    keyboardType="number-pad"
                    onChangeText={(text) => setProductPrice(text)}
                  />
                  <Input
                    placeholder="Número de items do produto"
                    value={itemsNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) => setItemsNumber(text)}
                  />
                  <DropdownWrappeer>
                    <RNPickerSelect
                      value={availability}
                      onValueChange={(value, itemIndex) =>
                        setAvailability(value)
                      }
                      style={{
                        placeholder: {
                          color: '#2e2e2e',
                        },
                      }}
                      placeholder={
                        {
                            label: 'Selecione a disponibilidade',
                        value: 1,
                        color: '#9EA0A4',
                        }
                      }
                      items={[
                        /* { label: 'Selecione a disponibilidade', value: 1 }, */
                        { label: 'Disponível', value: 2 },
                        { label: 'Indisponível', value: 3 },
                      ]}
                    />
                  </DropdownWrappeer>
                  <DropdownWrappeer>
                    <RNPickerSelect
                      value={measurement}
                      onValueChange={(itemValue, itemIndex) =>
                        setMeasurement(itemValue)
                      }
                      style={{
                        placeholder: {
                          color: '#2e2e2e',
                        },
                      }}
                      placeholder={
                        {
                           label: 'Selecione a unidade de medida',
                        value: 1,
                        color: '#999999',
                        }
                      }
                      items={[
                        /* {
                          label: 'Selecione a unidade de medida',
                          value: 1,
                          color: '#9EA0A4',
                        }, */
                        {
                          label: '1 Quilograma (kg)',
                          value: 2,
                        },
                        { label: '1 Litro (l)', value: 3 },
                        { label: '500 Gramas (g)', value: 4 },
                        { label: '500 Mililitros (ml)', value: 5 },
                      ]}
                    />
                  </DropdownWrappeer>
                  <P>Fotos do Produto (até 2 fotos)</P>

                  <WrapperListAddProduct>
                    <FlatList
                      horizontal
                      data={productphotoList}
                      extraData={extraPhoto}
                      ListFooterComponent={() => (
                        <MediaSpotButtonAddProduct
                          onPress={() => handleChoosePhoto()}
                        >
                          <AddMediaButtonWrapperAddProduct>
                            <Icon color="#84378F" size={35} name="plus" />
                          </AddMediaButtonWrapperAddProduct>
                        </MediaSpotButtonAddProduct>
                      )}
                      /* ListEmptyComponent={() => <View />} */
                      renderItem={({ item, index }) => (
                        <MediaWrapper>
                          <RemoveMediaButtonWrapper
                            source={item}
                            resizeMode="contain"
                          >
                            {learning ? (
                              <Animatable.View
                                animation="slideInRight"
                                iterationCount={5}
                              >
                                <Image
                                  source={require('../../../assets/learn.png')}
                                />
                              </Animatable.View>
                            ) : null}
                            <RemoveMedia onPress={() => removePhoto(index)}>
                              <Icon color="#EA3232" size={35} name="trash-o" />
                            </RemoveMedia>
                          </RemoveMediaButtonWrapper>
                        </MediaWrapper>
                      )}
                      keyExtractor={(index) => String(index.uri)}
                    />
                  </WrapperListAddProduct>
                  <WrapperButtons>
                    <AddProductButton onPress={() => editProduct()}>
                      <AddProductButtonText>Atualizar</AddProductButtonText>
                    </AddProductButton>
                    <RemoveProductButton>
                      <AddProductButtonText
                        onPress={() => {
                          deleteProduct();
                        }}
                      >
                        Excluir
                      </AddProductButtonText>
                    </RemoveProductButton>
                  </WrapperButtons>
                </FormAddProduct>
              </ModalBackground>
            </KeyboardAwareScrollView>
   
        
        </Container>
    </>
  );
};

export default AddProducts;
