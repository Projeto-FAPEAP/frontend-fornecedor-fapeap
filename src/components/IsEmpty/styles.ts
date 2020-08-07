import AdIcon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 14px;
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  line-height: 28px;
`;

export const Icon = styled(AdIcon)`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
`;
