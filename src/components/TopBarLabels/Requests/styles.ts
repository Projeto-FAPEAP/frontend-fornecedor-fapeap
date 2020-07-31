import { ViewProps } from 'react-native';

import styled from 'styled-components/native';

import TooltipView from '../../Tooltip';

interface ITextLabelProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text<ITextLabelProps>`
  font-size: 14px;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.primary : theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  text-transform: uppercase;
`;

export const Tooltip = styled(TooltipView)<ViewProps>`
  margin-left: 5px;
`;
