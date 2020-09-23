import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
  justify-content: space-around;
  align-self: stretch;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.bold};
  font-size: 32px;
`;

export const Form = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ButtonSignIn = styled(Button)`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  margin-top: 20px;
`;

export const RetrievePasswordButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-radius: 22px;
  justify-content: center;
  margin: 20px;
`;

export const Footer = styled.View`
  flex-direction: row;
  margin: 0 auto;
`;

export const RetrievePasswordText = styled.Text`
  font-size: 16px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  color: ${(props) => props.theme.colors.primary};
`;

export const RegularText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  color: ${(props) => props.theme.colors.darker};
`;

export const RegisterButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin-left: 5px;
`;

export const RegisterButtonText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  color: ${(props) => props.theme.colors.primary};
`;
