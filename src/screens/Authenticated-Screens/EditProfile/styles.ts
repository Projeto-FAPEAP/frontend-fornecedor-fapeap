import Button from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 18px;
  margin: 15px auto 30px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
`;

export const Form = styled.View`
  width: 20%;
`;

export const ContentPhotos = styled.View`
  flex-direction: row;
  justify-content: center;
`;

/* export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`; */

export const ButtonSubmit = styled(Button)`
  align-self: center;
  margin-top: 20px;
  width: 40%;
  min-width: 40%;
  background-color: ${({ theme }) => theme.colors.success};
`;

/* export const ButtonDelete = styled(Button)`
  width: 40%;
  background-color: ${({ theme }) => theme.colors.transparent};
  border-color: ${({ theme }) => theme.colors.danger};
  border-width: 1px;
`; */
