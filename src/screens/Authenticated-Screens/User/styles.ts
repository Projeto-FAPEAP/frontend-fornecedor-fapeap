import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;
`;

export const Header = styled.View`
  background: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  height: ${hp('25%')}px;
  justify-content: flex-end;
`;
export const Options = styled.View`
  background: #f2f1f7;
  flex-direction: column;
  height: ${hp('25%')}px;
  justify-content: center;
  align-items: center;
`;
export const Button = styled.TouchableOpacity`
  background: #fff;
  flex-direction: row;
  height: ${hp('10%')}px;
  border-width: 1px;
  width: ${wp('90%')}px;
  border-color: #e4e4e6;
  justify-content: space-around;
  align-items: center;
  margin-bottom: ${hp('1%')}px;
`;

export const ButtonWrapperText = styled.View`
  width: 80%;
`;

export const ButtonText = styled.Text`
  color: #7d7d7d;
  font-size: ${hp('2.8%')}px;
`;
export const ButtonIcon = styled.View`
  width: 15%;
  align-items: center;
`;

export const StoreName = styled.Text`
  color: #fff;
  font-size: ${hp('3.5%')}px;
  padding: ${hp('3.5%')}px;
`;
