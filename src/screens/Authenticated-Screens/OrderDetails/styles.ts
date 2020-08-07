import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const Container = styled.View`
  
  flex-direction: column;
  border-width:1px;
  background: #f9f9f9;
  min-height:${hp('100%')}px;
`;

export const ClientInformation = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
 /*  height: ${hp('35%')}px; */
  height: ${hp('15%')}px;
  background: #f9f9f9;
  border-bottom-width:1px;
  border-color:#dedede;
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
  font-size: ${hp('2.8%')}px;
  color:#333;
  font-family:${(props)=> props.theme.fonts.Ubuntu.bold }
`;

export const SubTitle = styled.Text`
  padding-top: ${hp('.5%')}px;
  font-size: ${hp('2%')}px;
  color: #666666;
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
`;

export const Span = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: ${hp('14%')}px;
  width:100%;
  background:#fff;
  border-radius:2px;
  border-top-width:1px;
  border-color:#dedede;
`;

export const ClientInformationTextWrapper = styled.View`
  justify-content: space-around;
  align-self:center;
  width: ${wp('45%')}px;
`;

export const ClientInformationButtonWrapper = styled.View`
  justify-content: space-around;
  align-items: center;
  height:100%;
  width: ${wp('38%')}px;
`;

export const ButtonShareLocalization = styled.TouchableOpacity`
  justify-content: space-around;
  align-items: center;

  width: ${wp('35%')}px;
  height: ${hp('6%')}px;
  border-radius: 12px;
  background: #6fcf97;
  flex-direction: row;
`;

export const ButtonShareLocalizationIcon = styled.View`
  width: ${wp('5%')}px;
`;
export const ButtonShareLocalizationText = styled.Text`
  font-size: ${hp('2.2%')}px;
  width: ${wp('25')}px;
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
  color: #fff;
`;

export const OrderInformation = styled.View`
  background: #f9f9f9;
  height: ${hp('60%')}px;
  align-items: center;
  justify-content: center;
 
  padding: ${hp('1%')}px;
  
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
  border-radius: 12px;
  height: ${hp('6%')}px;
  margin-top: 25px;

  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  margin-bottom: ${hp('1.8%')}px;
`;

export const ButtonCancel = styled.TouchableOpacity`
  width: ${wp('45%')}px;
  border-radius: 12px;
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
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
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
  color: #333;
  font-family:${(props)=> props.theme.fonts.Ubuntu.bold }
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
  font-family:${(props)=> props.theme.fonts.Ubuntu.bold }
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
  height:${hp('45%')}px;
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

export const ListRowPending = styled.Text`
  width:60px;
  font-size: ${hp('2%')}px;
  color: white;
  background:#ffd500;
  text-align:center;
  border-radius:2px;
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
`;

export const ListRowConfirmed = styled.Text`
  width:80px;
  font-size: ${hp('2%')}px;
  color: white;
  background:#59A656;
  text-align:center;
  border-radius:2px;
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
`;