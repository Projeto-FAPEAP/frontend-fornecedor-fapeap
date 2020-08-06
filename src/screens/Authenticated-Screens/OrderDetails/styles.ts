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

export const BackButtonWrapper = styled.TouchableOpacity`
  width: ${wp('20%')}px;
  padding-left: ${hp('2.5%')}px;
`;

export const Header = styled.View`
  justify-content: space-around;
  align-items:center
flex-direction:row
  height: ${hp('7.5%')}px;
  background: ${(props) => props.theme.colors.primary};
`;

export const HeaderTextWrapper = styled.View`
  width: ${wp('80%')}px;
`;

export const HeaderText = styled.Text`
  font-size: ${hp('2.5%')}px;
  color: #fff;
`;

export const ClientInformation = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: ${hp('35%')}px;
  border-bottom-width: 1px;
  background: #f5f5f5;
  border-color: #bdc8d0;
`;

export const ClientInformationImageWrapper = styled.View`
  justify-content: space-around;
  align-items: center;

  height: ${hp('20%')}px;
`;

export const ClientInformationImage = styled.Image`
  width: ${wp('45%')}px;
  height: ${hp('45%')}px;
`;

export const Title = styled.Text`
  font-size: ${hp('2.5%')}px;
  color: #444444;
  padding-left: ${hp('2.2%')}px;
`;

export const SubTitle = styled.Text`
  color: #666666;
  font-size: ${hp('1.8%')}px;
  padding-left: ${hp('2.2%')}px;
`;

export const Span = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: ${hp('12%')}px;
`;

export const ClientInformationTextWrapper = styled.View`
  justify-content: space-around;

  width: ${wp('45%')}px;
`;

export const ClientInformationButtonWrapper = styled.View`
  justify-content: space-around;
  align-items: center;

  width: ${wp('55%')}px;
`;

export const ButtonShareLocalization = styled.TouchableOpacity`
  justify-content: space-around;
  align-items: center;

  width: ${wp('48%')}px;
  height: ${hp('10%')}px;
  border-radius: 22px;
  background: #6fcf97;
  flex-direction: row;
`;

export const ButtonShareLocalizationIcon = styled.View`
  width: ${wp('8%')}px;
`;
export const ButtonShareLocalizationText = styled.Text`
  font-size: ${hp('2.5%')}px;
  width: ${wp('30')}px;

  color: #fff;
`;

export const OrderInformation = styled.View`
  background: #f9f9f9;
  min-height: ${hp('53.5%')}px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  padding: ${hp('1%')}px;
  border-color: #f0f0f0;
`;

export const OrderRecipe = styled.View`
  width: ${wp('90')}px;
  background: #fff;
  border-width: 1px;
  border-color: #e6dada;
  min-height: ${hp('40%')}px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

export const Button = styled.TouchableOpacity`
  width: ${wp('45%')}px;
  border-radius: 22px;
  height: ${hp('6%')}px;
  margin-top: 25px;

  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  margin-bottom: ${hp('1.8%')}px;
`;

export const ButtonCancel = styled.TouchableOpacity`
  width: ${wp('45%')}px;
  border-radius: 22px;
  height: ${hp('6%')}px;
  margin-top: 25px;

  justify-content: center;
  background: #EB5757
  margin-bottom: ${hp('1.8%')}px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.secundary};
`;

export const TotalSpan = styled.View`
  border-top-width: 1px;
  border-color: #d4cbcb;
  text-align: center;
  align-content: center;
  height: ${hp('5%')}px;
  flex-direction: row;
  justify-content: space-between;
  width: ${wp('75%')}px;
`;

export const TotalText = styled.Text`
  padding-top: ${hp('1%')}px;
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: #444444;
  font-weight: bold;
`;

export const SubTotalSpan = styled.View`
  border-top-width: 1px;
  border-color: #d4cbcb;
  text-align: center;
  align-content: center;
  height: ${hp('8%')}px;
  flex-direction: column;
  justify-content: space-around;
  width: ${wp('75%')}px;
`;

export const SubTotalSpanInner = styled.View`
  width: ${wp('75%')}px;
  padding-top: ${hp('1%')}px;
  text-align: center;
  align-content: center;
  height: ${hp('5%')}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const SubTotalText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2%')}px;
  color: #9a9a9a;
  font-weight: bold;
`;

export const Amount = styled.Text`
  font-size: ${hp('2%')}px;
  color: #9a9a9a;
`;

export const ListWrapper = styled.View`
  width: ${wp('75%')}px;
  padding-top: ${hp('1%')}px;
  text-align: center;
  align-content: center;

  flex-direction: row;
  justify-content: space-between;
`;

export const ListWrapperInner = styled.View`
  width: ${wp('75%')}px;
  padding-top: ${hp('1%')}px;
  text-align: center;
  align-content: center;

  flex-direction: row;
  justify-content: space-between;
`;

export const ListWrapperItem = styled.View`
  border-bottom-width: 1px;
  border-color: #d4cbcb;
  width: ${wp('75%')}px;
  align-content: flex-start;
  height: ${hp('9%')}px;
  flex-direction: column;
  justify-content:flex-start;
`;