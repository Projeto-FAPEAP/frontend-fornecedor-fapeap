import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
  align-self: stretch;
`;

export const Header = styled.View`
  margin: 50px 0 20px;

  justify-content: space-around;
`;
export const Form = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.bold};
  font-size: 32px;
`;

export const P = styled.Text`
  margin-top: 15px;
  color: ${(props) => props.theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  font-size: 15px;
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  margin-top: 20px;
`;
