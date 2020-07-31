import styled, { css } from 'styled-components/native';

interface IContainerProps {
  color: 'danger' | 'success';
}

const colorVariations = {
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
  `,
};

export const Container = styled.View<IContainerProps>`
  ${({ color }) => colorVariations[color || 'success']};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-top: auto;

  justify-content: center;
  align-items: center;
`;

export const TooltipText = styled.Text`
  text-align: center;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.white};
`;
