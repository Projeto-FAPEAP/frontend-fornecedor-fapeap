import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.View`
  background: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  height: 30%;
  justify-content: flex-end;
`;
export const Options = styled.View`
  background: #f2f1f7;
  flex-direction: column;
  height: 70%;
  justify-content: flex-start;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background: #fff;
  flex-direction: row;
  height: 65px;
  border-width: 1px;
  width: 95%;
  border-color: #e4e4e6;
  justify-content: space-around;
  align-items: center;
  margin-top: 3px;
`;

export const ButtonWrapperText = styled.View`
  width: 80%;
`;

export const ButtonText = styled.Text`
  color: #7d7d7d;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;
export const ButtonIcon = styled.View`
  width: 15%;
  align-items: center;
`;

export const StoreName = styled.Text`
  color: #fff;
  font-size: 25px;
  padding: 30px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;
