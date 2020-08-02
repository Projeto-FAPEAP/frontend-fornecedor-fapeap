import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  border-radius: ${({ theme }) => theme.metrics.border}px;
  height: 44px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  padding: 0 20px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
  color: ${({ theme }) => theme.colors.white};
`;
