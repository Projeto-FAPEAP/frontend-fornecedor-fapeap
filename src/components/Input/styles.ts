import FaIcon from 'react-native-vector-icons/Feather';

import styled, { css } from 'styled-components/native';

interface IPropsContentInput {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`;

export const ContentInput = styled.View<IPropsContentInput>`
  align-items: center;
  width: 100%;
  padding: 0 10px;
  border-width: 2px;
  flex-direction: row;
  height: 44px;
  border-radius: ${({ theme }) => theme.metrics.border}px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};

  ${({ isErrored, isFocused, isFilled }) => {
    if (isErrored) {
      return css`
        border-color: ${({ theme }) => theme.colors.danger};
      `;
    }
    if (isFocused) {
      return css`
        border-color: ${({ theme }) => theme.colors.primary};
      `;
    }

    if (isFilled) {
      return css`
        border-color: ${({ theme }) => theme.colors.primary};
      `;
    }

    return css`
      border-color: ${({ theme }) => theme.colors.regular};
    `;
  }};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding-right: 10px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  color: ${({ theme, editable }) =>
    editable ? theme.colors.title : theme.colors.regular};
  height: 44px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  margin-bottom: 5px;
`;

export const Error = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
`;

export const Icon = styled(FaIcon)`
  margin-right: 16px;
`;
