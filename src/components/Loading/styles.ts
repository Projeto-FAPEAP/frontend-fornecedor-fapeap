import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Spinner = styled.ActivityIndicator`
  color: ${({ theme }) => theme.colors.primary};
`;
