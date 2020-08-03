import Button from '@components/Button';
import styled from 'styled-components/native';

interface IDotsProps {
  isFilled: boolean;
  color: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
  align-self: stretch;
`;

export const Header = styled.View`
  margin: 50px 0 20px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.bold};
  font-size: 32px;
`;

export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
  font-size: 16px;

  margin-top: 10px;
`;

export const Form = styled.View`
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const Footer = styled.View`
  margin-top: auto;
  padding: 30px 25px;
`;

export const DotsContainer = styled.View`
  flex-direction: row;
  margin: 0 auto 45px;
`;

export const Dots = styled.TouchableOpacity.attrs({
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
  activeOpacity: 0.8,
})<IDotsProps>`
  margin: 0 10px;
  border-radius: 4px;
  height: 8px;
  width: 35px;
  background: ${({ color, isFilled, theme }) =>
    isFilled ? color : theme.colors.regular};
`;

export const ButtonSignIn = styled(Button)`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  margin-top: 20px;
`;
