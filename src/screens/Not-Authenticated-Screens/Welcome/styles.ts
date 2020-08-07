import { getBottomSpace } from 'react-native-iphone-x-helper';

import logo from '@assets/logo.png';
import Button from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const IconSpace = styled.Image.attrs({
  source: logo,
  resizeMode: 'contain',
})`
  width: 200px;
  height: 200px;
  margin: auto;
`;

export const Footer = styled.View`
  margin-top: auto;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};

  padding-bottom: ${getBottomSpace() + 20}px;
  padding-top: 20px;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const ContentFooter = styled.View`
  width: 100%;
  max-width: 350px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.bold};
  font-size: 32px;
`;

export const P = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  font-size: 16px;
  line-height: 20px;
  margin: 20px 0;
`;

export const LoginButton = styled(Button)`
  background: ${(props) => props.theme.colors.white};
`;

export const RegisterButton = styled(Button)`
  background: ${(props) => props.theme.colors.transparent};
  border-color: ${(props) => props.theme.colors.white};
  border-width: 1px;
`;

export const TextBetweenButtons = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  margin: 15px 0;
`;
