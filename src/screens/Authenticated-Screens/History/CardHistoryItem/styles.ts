import AdIcon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

interface IIConProps {
  color: string;
}
interface IStatusProps {
  color: string;
}

export const Container = styled.View``;

export const CardItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background: #fff;
  padding: 15px;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  border-bottom-width: 0.8px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const IConStatus = styled(AdIcon)<IIConProps>`
  font-size: 25px;
  color: ${({ color }) => color};
  margin-bottom: 2px;
`;

export const NameClient = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.bold};
  text-transform: capitalize;
`;

export const Sale = styled.Text`
  font-size: 14px;
  margin: 5px 0;
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
`;

export const Status = styled.Text<IStatusProps>`
  font-size: 14px;
  color: ${({ color }) => color};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
`;
