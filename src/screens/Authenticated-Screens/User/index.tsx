import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../../../contexts/auth';
import {
  Container,
  Header,
  Options,
  Button,
  ButtonText,
  ButtonWrapperText,
  ButtonIcon,
  StoreName,
} from './styles';

interface User {
  nome: string;
  nome_fantasia: string;
}
const User: React.FC = ({ navigation }) => {
  const [delivery, setDelivery] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  // const [pictures, setPictures] = useState([5]);
  const [showExtraInput, setShowExtraInput] = useState(0);
  const { logOut } = useContext(AuthContext);
  const [video, setVideo] = useState({});
  useEffect(() => {
    getInitialData();
  }, []);
  const [storeName, setStoreName] = useState('');
  async function getInitialData(): Promise<void> {
    let userLoaded = {} as User;
    userLoaded = JSON.parse(
      await AsyncStorage.getItem('@QueroAçaí-Fornecedor:user'),
    );
    console.log(userLoaded.nome, 'teste');

    setStoreName(userLoaded.nome_fantasia);
  }
  function logOutt(): void {
    Alert.alert(
      'Deseja mesmo sair?',
      'Você será redirecionado a tela inicial',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => logOut() },
      ],
      { cancelable: false },
    );
    console.log('oiiiiiii');
  }

  function isEmpty(obj: object): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  return (
    <Container>
      <Header>
        <StoreName>{storeName}</StoreName>
      </Header>
      <Options>
        <Button onPress={() => navigation.navigate('VisualizeRegister')}>
          <ButtonIcon>
            <Icon name="list" size={32} color="#798599" />
          </ButtonIcon>
          <ButtonWrapperText>
            <ButtonText>Visualizar Cadastro</ButtonText>
          </ButtonWrapperText>
        </Button>
        <Button onPress={() => navigation.navigate('EditProfile')}>
          <ButtonIcon>
            <Icon name="cog" size={32} color="#798599" />
          </ButtonIcon>
          <ButtonWrapperText>
            <ButtonText>Editar Cadastro</ButtonText>
          </ButtonWrapperText>
        </Button>
        <Button onPress={() => navigation.navigate('Settings')}>
          <ButtonIcon>
            <Icon name="image" size={32} color="#798599" />
          </ButtonIcon>
          <ButtonWrapperText>
            <ButtonText>Atualizar Mídias</ButtonText>
          </ButtonWrapperText>
        </Button>
        <Button onPress={() => logOutt()}>
          <ButtonIcon>
            <Icon name="sign-out" size={32} color="#EB5757" />
          </ButtonIcon>
          <ButtonWrapperText>
            <ButtonText>Sair</ButtonText>
          </ButtonWrapperText>
        </Button>
      </Options>
    </Container>
  );
};

export default User;
