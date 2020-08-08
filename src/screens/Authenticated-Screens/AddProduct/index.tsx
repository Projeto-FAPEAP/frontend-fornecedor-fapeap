import React, { useState, useEffect ,useContext} from 'react';
import { View, FlatList, Alert, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import Loader from '../../utils/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import ProductContext from  '../../../contexts/product';
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
const AddProduct: React.FC = () => {
    const navigation = useNavigation()
    const [extraPhoto, setExtraPhoto] = useState(false);;
    const [loading, setLoading] = useState(false);
    
    // Variaveis referentes ao cadastro do Produto
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [itemsNumber, setItemsNumber] = useState('');
    const [availability, setAvailability] = useState(0);
    const [measurement, setMeasurement] = useState(0);
    const [productphotoList, setProductphotoList] = useState<
      ImagePickerResponse[]
    >([]);
    const {getAllProducts} = useContext(ProductContext);
    const [learning, setLearning] = useState(false);
 

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

  async function addProduct(): Promise<void> {
    console.log(measurement)
    if (
      productName === '' ||
      productPrice === '' ||
      itemsNumber === '' ||
      availability === 1 ||
      availability === 0 ||
      measurement === 1 ||
      measurement === 0 ||
      productphotoList.length === 0
    ) {
      Alert.alert('Aviso', 'Preencha todos os campos!!');
    } else {
      console.log(measurement);
      setLoading(true);
      const formData = new FormData();

      const photoListArray = productphotoList;
 
      const image = {};

      formData.append('nome', productName);
      formData.append('preco', parseFloat(productPrice));
      formData.append('estoque_produto', itemsNumber);
      formData.append('status_produto', availability === 2);

      formData.append('unidade_medida', measurement);

      for (let i = 0; i < productphotoList.length; i += 1) {
        formData.append('file', photoListArray[i]);
      }
      console.log(productPrice);

      /* fetch('https://fapeap.colares.net.br/fornecedor', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(
          (response) => response.json(), // if the response is a JSON object
        )
        .then(
          (success) => console.log(success), // Handle the success response object
        )
        .catch(
          (error) => console.log(JSON.stringify(error, null, 2)), // Handle the error response object
        ); */

      try {
        const response = await api.post(
          `${api.defaults.baseURL}/produto`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
        setProductName('');
        setItemsNumber('');
        setAvailability(0);
        setMeasurement(0);
        setProductPrice('');
        setProductphotoList([]);
      
        setLoading(false);
        getAllProducts().then(
          (response)=>{
            Alert.alert('Aviso','Adicionado com sucesso!!',[{
              text: 'Ok',
              onPress: () => navigation.navigate('Index'),
              style: 'default',
            },]);
          }
        )
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
useEffect(()=>{
  console.log(measurement)
})
  

 
  return (
    <>
      <Container>
        <Loader loading={loading}/>
        
            <KeyboardAwareScrollView>
              <ModalBackground>
                <FormAddProduct>
                  

                  <Input
                    value={productName}
                    placeholder="Nome do Produto"
                    onChangeText={(text) => setProductName(text)}
                  />
                  <Input
                    value={productPrice}
                    placeholder="Preço do Produto"
                    onChangeText={(text) => setProductPrice(text)}
                    keyboardType="number-pad"
                  />
                  <Input
                    value={itemsNumber}
                    placeholder="Número de items do produto"
                    keyboardType="number-pad"
                    onChangeText={(text) => setItemsNumber(text)}
                  />
                  <DropdownWrappeer>
                    <RNPickerSelect
                      value={availability}
                      onValueChange={(itemValue, itemIndex) =>
                        setAvailability(itemValue)
                      }
                      style={{
                        placeholder: {
                          color: '#2e2e2e',
                        },
                      }}
                      placeholder={{
                        label: 'Selecione a disponibilidade',
                        value: 1,
                        color: '#9EA0A4',
                      }}
                      items={[
                        { label: 'Disponível', value: 2 },
                        { label: 'Indisponível', value: 3 },
                      ]}
                    />
                    {/* <Dropdown
                      selectedValue={availability}
                      onValueChange={(itemValue, itemIndex) =>
                        setAvailability(itemValue)
                      }
                    >
                      <Dropdown.Item label="Disponibilidade?" value={0} />
                      <Dropdown.Item label="Disponível" value={1} />
                      <Dropdown.Item label="Indisponível" value={2} />
                    </Dropdown> */}
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
                      placeholder={{
                        label: 'Selecione a unidade de medida',
                        value: 1,
                        color: '#9EA0A4',
                      }}
                      items={[
                        {
                          label: '1 Quilograma (kg)',
                          value: 2,
                        },
                        { label: '1 Litro (l)', value: 3 },
                        { label: '500 Gramas (g)', value: 4 },
                        { label: '500 Mililitros (ml)', value: 5 },
                      ]}
                    />
                    {/* <Dropdown
                      selectedValue={measurement}
                      onValueChange={(itemValue, itemIndex) =>
                        setMeasurement(itemValue)
                      }
                    >
                      <Dropdown.Item label="Unidade de Medida?" value={0} />
                      <Dropdown.Item label="1 Quilograma (kg)" value={1} />
                      <Dropdown.Item label="1 Litro (l)" value={2} />
                      <Dropdown.Item label="500 Gramas (g)" value={3} />
                      <Dropdown.Item label="500 Mililitros (ml)" value={4} />
                    </Dropdown> */}
                  </DropdownWrappeer>
                  <P>Fotos (até 2 fotos)</P>

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
                    <AddProductButton onPress={() => addProduct()}>
                      <AddProductButtonText>
                        Adicionar Produto
                      </AddProductButtonText>
                    </AddProductButton>
                  </WrapperButtons>
                </FormAddProduct>
              </ModalBackground>
            </KeyboardAwareScrollView>
   
        
        </Container>
    </>
  );
};

export default AddProduct;