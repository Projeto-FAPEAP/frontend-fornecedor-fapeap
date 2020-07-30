import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${hp('4.4%')}px;
  color: #fff;
  padding: 25px;
`;

export const Span = styled.View`
  background: ${(props) => props.theme.colors.primary};

  height: ${hp('50%')}px;
  width: ${wp('100%')}px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const IconSpace = styled.View`
  height: ${hp('50%')}px;
`;
export const P = styled.Text`
  font-size: ${hp('2.4%')}px;
  color: #fff;
  padding-left: 25px;
  padding-right: 25px;
`;

export const LoginButton = styled.TouchableOpacity`
  border-radius: 22px;
  height: ${hp('5%')}px;
  margin-top: 25px;
  margin-right: 25px;
  margin-left: 25px;
  justify-content: center;
  background: ${(props) => props.theme.colors.secundary};
`;

export const LoginButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.primary};
`;

export const RegisterButton = styled.TouchableOpacity`
  border-radius: 22px;
  height: ${hp('5%')}px;
  margin-top: ${hp('2%')}px;
  margin-right: 25px;
  margin-left: 25px;
  justify-content: center;
  border-width: 1px;
  border-color: #fff;
  background: ${(props) => props.theme.colors.primary};
`;

export const RegisterButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: ${(props) => props.theme.colors.secundary};
`;
export const TextBetweenButtons = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  padding-top: ${hp('2%')}px;

  color: ${(props) => props.theme.colors.secundary};
`;
