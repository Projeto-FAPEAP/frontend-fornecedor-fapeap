import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import ButtonDefault from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding-top: ${getStatusBarHeight()}px;
  align-items: center;
  justify-content: center;
  height: 30%;
  background: ${({ theme }) => theme.colors.primary};
`;

export const IconSuccess = styled(FaIcon).attrs({
  name: 'exclamation',
})`
  font-size: 80px;
  color: ${({ theme }) => theme.colors.success};
`;

export const Content = styled.View`
  flex: 1;
  padding: 25px 20px;
  padding-bottom: ${25 + getBottomSpace()}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darker};
  margin-top: 16px;
`;

export const Button = styled(ButtonDefault).attrs({
  fontBold: true,
})`
  margin-top: auto;
`;
