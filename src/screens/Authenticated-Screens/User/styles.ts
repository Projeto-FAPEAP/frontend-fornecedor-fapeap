import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex: 1;
`;

export const TextProfile = styled.Text`
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  font-size: 18px;
  margin-bottom: 2px;
`;

export const Subtitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const ViewList = styled.View``;
