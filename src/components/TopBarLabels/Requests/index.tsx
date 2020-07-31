import React from 'react';
import { ViewProps } from 'react-native';

import { Container, Title, Tooltip } from './styles';

interface IPropsLabelTopBar extends ViewProps {
  isFocused: boolean;
}

const Requests: React.FC<IPropsLabelTopBar> = ({ isFocused, ...rest }) => {
  return (
    <Container {...rest}>
      <Title isFocused={isFocused}>Pedidos</Title>
      <Tooltip color="success">2</Tooltip>
    </Container>
  );
};

export default Requests;
