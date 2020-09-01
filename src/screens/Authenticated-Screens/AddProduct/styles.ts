import { getBottomSpace } from 'react-native-iphone-x-helper';

import Button from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 20px 10px 0;
  justify-content: center;
  align-items: stretch;
  padding-bottom: ${20 + getBottomSpace()}px;
`;

export const Title = styled.Text`
  font-size: 18px;
  margin: 15px auto 30px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const ContentPhotos = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`;

export const ButtonSubmit = styled(Button)`
  margin: 0 auto;
  width: 40%;
  background-color: ${({ theme }) => theme.colors.success};
`;
