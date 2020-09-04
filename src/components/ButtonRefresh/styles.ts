import { RectButton } from 'react-native-gesture-handler';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

interface IButtonTextProps {
  color?: string;
}

export const Container = styled(RectButton)`
  border-radius: ${({ theme }) => theme.metrics.border}px;
  height: 44px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const ButtonText = styled.Text<IButtonTextProps>`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
  color: ${({ theme, color }) => color || theme.colors.white};
`;

export const IconSuccess = styled(FaIcon).attrs({
  name: 'refresh',
})`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.regular};
  border-radius: ${({ theme }) => theme.metrics.border}px;
  height: 100%;
`;
