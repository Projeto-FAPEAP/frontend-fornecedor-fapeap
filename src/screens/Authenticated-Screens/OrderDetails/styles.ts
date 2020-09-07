import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Buttonn from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const ClientInformation = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  /*   height:12%; */
  background: #f9f9f9;
  border-bottom-width: 1px;
  border-color: #dedede;
`;

export const ClientInformationImageWrapper = styled.View`
  justify-content: space-around;
  align-items: center;

  height: 20%;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu-Bold';
  font-size: 14px;
`;

export const SubTitle = styled.Text`
  padding-top: 3px;
  font-size: 12px;
  color: #666666;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const Span = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 90px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  border-top-width: 1px;
  border-color: #dedede;
`;

export const ClientInformationTextWrapper = styled.View`
  justify-content: space-around;
  align-self: center;
  width: 45%;
`;

export const ClientInformationButtonWrapper = styled.View`
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 38%;
`;

export const ButtonShareLocalization = styled.TouchableOpacity`
  justify-content: space-around;
  align-items: center;

  width: 100px;
  height: 38%;
  border-radius: 12px;
  background: #6fcf97;
  flex-direction: row;
`;

export const ButtonShareLocalizationIcon = styled.View`
  width: 15%;
`;
export const ButtonShareLocalizationText = styled.Text`
  font-size: 14px;
  width: 75%;
  font-family:${(props) => props.theme.fonts.Ubuntu.normal}
  color: #fff;
`;

export const OrderInformation = styled.View`
  background: #f9f9f9;
  min-height: 400px;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

export const OrderRecipe = styled.View`
  width: 95%;
  background: #fff;
  border-width: 1px;
  border-color: #e6dada;
  min-height: 250px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

export const Button = styled(Buttonn)`
  min-width: 48%;
  max-width: 50%;
  border-radius: 12px;
  height: 38px;
  margin-top: 25px;

  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

export const ButtonCancel = styled(Buttonn)`
  width: 48%;
  border-radius: 12px;
  height: 38px;
  margin-top: 25px;

  justify-content: center;
  background: #EB5757
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: 15px;
  color: #fff;

  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const TotalSpan = styled.View`
  border-top-width: 1px;
  border-color: #d4cbcb;
  text-align: center;
  align-content: center;
  height: 32px;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
`;

export const TotalText = styled.Text`
  padding-top: 8px;
  text-align: center;
  align-content: center;
  font-size: 15px;
  color: #333;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;

export const SubTotalSpan = styled.View`
  /*  border-top-width: 1px;
  border-color: #d4cbcb; */
  text-align: center;
  align-content: center;
  height: 52px;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
`;

export const SubTotalSpanInner = styled.View`
  width: 100%;
  padding-top: 8px;
  text-align: center;
  align-content: center;
  height: 38px;
  flex-direction: row;
  justify-content: space-between;
`;

export const SubTotalText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: 13px;
  color: #9a9a9a;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;

export const Amount = styled.Text`
  font-size: 13px
  color: #9a9a9a;
`;

export const ListWrapper = styled.View`
  width: 85%;
  padding-top: 5px;
  text-align: center;
  align-content: center;
  /*   min-height:60%; */
  flex-direction: row;
  justify-content: space-between;
`;

export const ListWrapperInner = styled.View`
  width: 100%;
  padding-top: 7px;
  text-align: center;
  align-content: center;

  flex-direction: row;
  justify-content: space-between;
`;

export const ListWrapperItem = styled.View`
  border-bottom-width: 1px;
  border-color: #d4cbcb;
  width: 100%;
  align-content: flex-start;
  height: 60px;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ListRowPending = styled.Text`
  width: 60px;
  font-size: 12px;
  color: white;
  background: #ffd500;
  text-align: center;
  border-radius: 2px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ListRowConfirmed = styled.Text`
  width: 90px;
  font-size: 12px;
  color: white;
  background: #59a656;
  text-align: center;
  border-radius: 2px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
`;

export const Subtitle = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: 14px;
`;

export const BorderBottom = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  margin-top: 10px;
`;

export const StatusView = styled.View`
  margin-top: 10px;
  align-items: center;
`;

export const PrincipalText = styled.Text`
  font-family: Ubuntu-Bold;
  font-size: 18px;
  color: #444444;
  top: 5%;
`;
