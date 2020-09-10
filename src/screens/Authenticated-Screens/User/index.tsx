import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, ListItem } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

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
  TextProfile,
  Subtitle,
} from './styles';

interface User {
  nome: string;
  nome_fantasia: string;
}
const User: React.FC = () => {
  const navigation = useNavigation();
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
      'Sair da conta',
      'Você realmente deseja sair de sua conta?',
      [
        { text: 'Sim', onPress: () => logOut() },
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
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
      <Card
        containerStyle={{
          borderRadius: 5,
          paddingHorizontal: 30,
        }}
      >
        <View>
          <TextProfile>{storeName}</TextProfile>
          <Subtitle>
            Faça a edição de seus dados pessoais, de acesso e de entrega
          </Subtitle>
        </View>
      </Card>
      <ScrollView>
        <Card
          containerStyle={{
            borderRadius: 5,
            paddingHorizontal: 15,
          }}
        >
          <ListItem
            title="Visualizar Cadastro"
            titleStyle={{
              fontFamily: 'Ubuntu-Bold',
            }}
            subtitle="Listar dados"
            subtitleStyle={{
              fontFamily: 'Ubuntu-Regular',
              marginTop: 5,
            }}
            bottomDivider
            chevron
            onPress={() => navigation.navigate('VisualizeRegister')}
          />
          <ListItem
            title="Editar Perfil"
            titleStyle={{
              fontFamily: 'Ubuntu-Bold',
            }}
            subtitle="Telefone, whatsapp, senha"
            subtitleStyle={{
              fontFamily: 'Ubuntu-Regular',
              marginTop: 5,
            }}
            bottomDivider
            chevron
            onPress={() => navigation.navigate('EditProfile')}
          />
          <ListItem
            title="Atualizar Mídias"
            titleStyle={{
              fontFamily: 'Ubuntu-Bold',
            }}
            subtitle="Fotos e Vídeo"
            subtitleStyle={{
              fontFamily: 'Ubuntu-Regular',
            }}
            bottomDivider
            chevron
            onPress={() => navigation.navigate('Settings')}
          />
          <ListItem
            title="Delivery"
            titleStyle={{
              fontFamily: 'Ubuntu-Bold',
            }}
            subtitle="Alterar status de entrega"
            subtitleStyle={{
              fontFamily: 'Ubuntu-Regular',
            }}
            bottomDivider
            chevron
            onPress={() => navigation.navigate('EditDelivery')}
          />
          <ListItem
            title="Sair"
            titleStyle={{
              fontFamily: 'Ubuntu-Bold',
            }}
            subtitle="Desconecte-se da sua conta"
            subtitleStyle={{
              fontFamily: 'Ubuntu-Regular',
            }}
            chevron
            onPress={() => logOutt()}
          />
        </Card>
      </ScrollView>
    </Container>
  );
};

export default User;
