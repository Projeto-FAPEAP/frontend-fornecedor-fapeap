import React, { memo } from 'react';
import { ViewProps } from 'react-native';

import { Container, TooltipText } from './styles';

interface ITooltipProps extends ViewProps {
  color: 'danger' | 'success';
  children: string | number;
}

const Tooltip: React.FC<ITooltipProps> = ({ children, color, ...rest }) => {
  return (
    <Container color={color} {...rest}>
      <TooltipText>{children}</TooltipText>
    </Container>
  );
};

export default memo(Tooltip);
