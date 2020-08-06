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
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
`;

export const WrapperList = styled.View`
  height: ${hp('30%')}px;
  width: ${wp('85%')}px;
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
  margin-bottom: ${hp('0.2%')}px;
  background: white;
  flex-direction:row;
`;

export const ListRowInnerLeft = styled.View`
  justify-content: center;
  width: ${wp('45%')}px;
  margin-bottom: ${hp('0.2%')}px;
  background: white;
`;

export const ListRowInnerRight = styled.View`
  justify-content: center;
  width: ${wp('45%')}px;
  margin-bottom: ${hp('0.2%')}px;
  background: white;
  align-items:flex-end;
`;

export const ListRowTitle = styled.Text`
  font-size: ${hp('2.8%')}px;
  color:#333;
  font-family:${(props)=> props.theme.fonts.Ubuntu.bold }
`;

export const ListRowSubTitle = styled.Text`
  padding-top: ${hp('.5%')}px;
  font-size: ${hp('2%')}px;
  color: #666666;
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
`;

export const ListRowPending = styled.Text`
  width:60px;
  font-size: ${hp('2%')}px;
  color: white;
  background:#ffd500;
  text-align:center;
  border-radius:2px;
 
  margin-bottom:${hp('3%')}px;
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
`;

export const ListRowConfirmed = styled.Text`
  width:80px;
  font-size: ${hp('2%')}px;
  color: white;
  background:#59A656;
  text-align:center;
  border-radius:2px;
  margin-bottom:${hp('3%')}px;
  font-family:${(props)=> props.theme.fonts.Ubuntu.normal }
`;

export const ListRowTotal = styled.Text`
  font-size: ${hp('2%')}px;
  color: #666666;
  font-family:${(props)=> props.theme.fonts.Ubuntu.bold }
`;
