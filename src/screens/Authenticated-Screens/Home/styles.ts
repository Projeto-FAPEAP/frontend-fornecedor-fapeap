import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;

  background: ${(props) => props.theme.colors.secundary};
`;

export const BackButtonWrapper = styled.View`
  padding-left: ${hp('2.5%')}px;
`;

export const WelcomeText = styled.Text`
  padding-left: ${hp('2.5%')}px;
  color: #fff;
  font-size: ${hp('2.4%')}px;
`;

export const TopTabMenu = styled.View`
  height: ${hp('7.5%')}px;
  width: ${wp('100%')}px;
  elevation: 5;
  flex-direction: row;
  background-color: #fff;
`;

export const Header = styled.View`
  justify-content: space-around;

  height: ${hp('7.5%')}px;
  background: ${(props) => props.theme.colors.primary};
`;

export const Section = styled.View`
  background: #f2f1f7;
  height: ${hp('5%')}px;
  align-content: center;
  justify-content: center;
`;

export const SectionTitle = styled.Text`
  color: #747479;
  font-size: ${hp('2.4%')}px;
  padding-left: ${hp('2.5%')}px;
`;

export const Form = styled.View`
  align-items: center;
  justify-content: flex-start;
`;

export const Footer = styled.View`
  height: ${hp('10%')}px;

  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const WrapperList = styled.View`
  height: ${hp('30%')}px;

  width: ${wp('85%')}px;
`;

export const MediaSpot = styled.View`
  height: ${hp('30%')}px;
  align-self: center;
  width: ${wp('85%')}px;
  border-width: 1px;
  border-color: #b8b6b6;
  margin-right: ${hp('.5%')}px;
`;

export const AddMediaButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

/* export const RemoveMediaButtonWrapper = styled.ImageBackground`
    justify-content: center;
    align-items: center;
  background-color:#0E1717
    height: 100%;
  `; */

export const MediaSpotButton = styled.TouchableOpacity`
  height: ${hp('30%')}px;
  align-self: center;
  width: ${wp('85%')}px;
  border-width: 1px;
  border-color: #b8b6b6;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${hp('5.5%')}px;
  padding-left: ${hp('5%')}px;
`;

export const Input = styled.TextInput`
  align-self: center;
  background: #fff;
  width: 85%;
  height: ${hp('6.5%')}px;
  elevation: 5;
  border-radius: 22px;
  margin-top: 26px;
  padding-horizontal: ${hp('1.8%')}px;
  padding-vertical: ${hp('1.8%')}px;
`;

export const DropdownWrappeer = styled.View`
  background: #fff;
  width: 85%;
  height: ${hp('6.5%')}px;
  elevation: 5;
  border-radius: 22px;
  margin-top: 26px;
  padding-horizontal: ${hp('1.8%')}px;
  overflow: hidden;
  align-self: center;
`;

export const Dropdown = styled.Picker`
  background: #fff;
  width: 100%;
  height: ${hp('6.5%')}px;
  color: #424242;
`;

export const P = styled.Text`
  font-size: ${hp('2.4%')}px;
  color: #000000;
  padding-vertical: ${hp('1.8%')}px;
  text-align: center;
`;

export const RegisterButton = styled.TouchableOpacity`
  width: ${wp('85%')}px;
  border-radius: 22px;
  height: ${hp('6%')}px;
  margin-top: 25px;
  margin-right: 25px;
  margin-left: 25px;
  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  margin-bottom: ${hp('1.8%')}px;
`;

export const RegisterButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.secundary};
`;

export const RetrievePasswordButton = styled.TouchableOpacity`
  border-radius: 22px;
  height: ${hp('5%')}px;
  margin-top: 25px;
  margin-right: 25px;
  margin-left: 25px;
  justify-content: center;
`;

export const RetrievePasswordText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;

  color: ${(props) => props.theme.colors.primary};
`;

export const RegularText = styled.Text`
  text-align: right;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  padding-top: ${hp('3%')}px;
  width: ${wp('55%')}px;
  color: #303030;
`;

export const OrderButton = styled.TouchableOpacity`
  width: ${wp('50%')}px;
  justify-content: center;
  align-items: center;
`;

export const ProductsButton = styled.TouchableOpacity`
  width: ${wp('50%')}px;
  justify-content: center;
  align-items: center;
`;
export const TopTabMenuTextActived = styled.Text`
  font-size: ${hp('1.8%')}px;
  color: ${(props) => props.theme.colors.primary};
`;

export const TopTabMenuTextInActived = styled.Text`
  font-size: ${hp('1.8%')}px;
  color: #666666;
`;

export const TopTabMenuInWrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ListWrapper = styled.View`
  align-items: center;
  background: #f2f1f7;
  height: ${hp('63%')}px;
`;
export const ListWrapperOrders = styled.View`
  align-items: center;
  background: #f2f1f7;
  height: ${hp('72.5%')}px;
`;

export const ListRow = styled.TouchableOpacity`
  justify-content: center;
  height: ${hp('17%')}px;
  width: ${wp('95%')}px;
  border-width: 1px;
  border-color: #e4e4e6;
  margin-bottom: ${hp('1%')}px;
  background: white;
`;

export const ListRowTitle = styled.Text`
  padding-left: ${hp('2.5%')}px;
  font-size: ${hp('2.8%')}px;
`;

export const ListRowSubTitle = styled.Text`
  padding-top: ${hp('.5%')}px;
  padding-left: ${hp('2.5%')}px;
  font-size: ${hp('2%')}px;
  color: #666666;
`;

export const SearchWrapper = styled.View`
  flex-direction: row;
  background: #f2f1f7;
  justify-content: space-around;
  height: ${hp('10%')}px;
  align-items: center;
`;

export const SearchInputButton = styled.TouchableOpacity`
  width: ${wp('65%')}px;
  background: #fff;
  border-radius: 22px;
  border-width: 1px;
  border-color: #e4e4e6;
  justify-content: center;
  height: ${hp('7%')}px;
  padding-left: ${hp('1.5%')}px;
`;

export const SearchInput = styled.TextInput`
  width: ${wp('65%')}px;
  background: #fff;
  border-radius: 22px;
  border-width: 1px;
  border-color: #e4e4e6;
  justify-content: center;
  height: ${hp('7%')}px;
  padding-left: ${hp('1.5%')}px;
`;

export const SearchTextInner = styled.Text`
  color: #878787;
  font-size: ${hp('2%')}px;
`;
export const AddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${wp('25%')}px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 22px;
  height: ${hp('7%')}px;
`;

export const AddButtonText = styled.Text`
text-align:center
  width: ${wp('25%')}px;
  color: #fff;
`;

export const ListProducts = styled.TouchableOpacity`
justify-content:space-around
  align-items: center;
  flex-direction: row;
  background: #fff;
  height: ${hp('17%')}px;
  width: ${wp('95%')}px;
  margin-bottom: ${hp('1%')}px;
  border-width: 1px;
  border-color: #e4e4e6;
`;

export const ListProductsImageWrapper = styled.Image`
  height: ${hp('23%')}px;
  width: ${wp('23%')}px;
  border-radius: 22px;
`;
export const ListProductsTextWrapper = styled.View`
  width: ${wp('65%')}px;
`;

// adicionar Produtos tela

export const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  background-color: #00000040;
  justify-content: center;
`;

export const FormAddProduct = styled.View`
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  min-height: ${hp('95%')}px;
  width: ${wp('90%')}px;
  border-radius: 10px;

  align-items: center;
  justify-content: space-around;
`;

export const HeaderAddProduct = styled.View`
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
  height: ${hp('15%')}px;
  width: ${wp('90%')}px;
`;

export const HeaderAddProductInnerTitle = styled.View`
  align-items: center;

  width: ${wp('75%')}px;
`;
export const HeaderAddProductInnerIcon = styled.View`
  align-items: center;
justify-content:center
  width: ${wp('15%')}px;
`;

export const AddProductButton = styled.TouchableOpacity`
  width: ${wp('40%')}px;
  border-radius: 22px;
  height: ${hp('6%')}px;

  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  margin-bottom: ${hp('1.8%')}px;
`;

export const WrapperButtons = styled.View`
 flex-direction:row;
width:100%

align-items:center;
justify-content:space-around
height:${hp('12%')}px;
`;

export const AddProductButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.secundary};
`;

export const RemoveProductButton = styled.TouchableOpacity`
  width: ${wp('40%')}px;
  border-radius: 22px;
  height: ${hp('6%')}px;

  justify-content: center;
  background: #eb5757;
  margin-bottom: ${hp('1.8%')}px;
`;

export const WrapperListAddProduct = styled.View`
  height: ${hp('25%')}px;
justify-content:center
align-items:center
  width: ${wp('75%')}px;
align-self:center
`;

export const MediaSpotButtonAddProduct = styled.TouchableOpacity`
  height: ${hp('25%')}px;
  align-self: center;
  width: ${wp('75%')}px;
  border-width: 1px;
  border-color: #b8b6b6;
`;

export const AddMediaButtonWrapperAddProduct = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const RemoveMediaButtonWrapperAddProduct = styled.ImageBackground`
    justify-content: center;
    align-items: center;
  background-color:#0E1717
    height: 100%;
  `;

export const CloseButtonAddProduct = styled.TouchableOpacity`
align-items: center;
justify-content:center
  width: ${wp('15%')}px;
  `;

export const RemoveMediaButtonWrapper = styled.ImageBackground`
    justify-content: flex-start;
    align-items: flex-end;
  background-color:#0E1717
  height: 100%;
  width: ${wp('75%')}px;
  `;

export const MediaWrapper = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  height: ${hp('25%')}px;
  border-width: 1px;
  width: ${wp('75%')}px;
  border-color: #b8b6b6;
  align-items: flex-end;
  background: #000;
`;

export const RemoveMedia = styled.TouchableOpacity`
  height: ${hp('8%')}px;
  width: ${wp('10%')}px;
  justify-content: center;

  align-items: center;
`;

export const FormScroll = styled.ScrollView`
  width: 100%;
  height:${hp('100%')}px;
  border-width:1px
  border-color:red
`;

// Buscar Produtos

export const ModalBackgroundSearch = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  background: #f2f1f7;
  justify-content: center;
`;

export const FormSearchProduct = styled.View`
  flex-direction: column;
  background: #f2f1f7;
  min-height: 100%;
  width: ${wp('100%')}px;
  border-radius: 10px;
`;

export const HeaderSearchProduct = styled.View`
  align-self: flex-end;
  flex-direction: row;
  background: #f2f1f7;
  height: 150px
  width: ${wp('100%')}px;
  
  padding-top: 70px;
`;

export const HeaderSearchProductInnerSearch = styled.View`
  align-items: center;
  align-self: center;
  width: 75%;
  justify-content: center;
`;

export const HeaderSearchProductInnerIcon = styled.View`
  align-items: center;
  justify-content: center;
  width: 15%;
  align-self: center;
`;

export const ListWrapperSearchProduct = styled.View`
  align-items: center;
  background: #f2f1f7;
  min-height: 250px;
`;
