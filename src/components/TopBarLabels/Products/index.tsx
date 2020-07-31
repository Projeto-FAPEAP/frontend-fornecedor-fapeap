import React from 'react';
import { ViewProps } from 'react-native';

import { Container, Title, Tooltip } from './styles';

interface IPropsLabelTopBar extends ViewProps {
  isFocused: boolean;
}

const Products: React.FC<IPropsLabelTopBar> = ({ isFocused, ...rest }) => {
  return (
    <Container {...rest}>
      <Title isFocused={isFocused}>Produtos</Title>
      <Tooltip color="success">2</Tooltip>
    </Container>
  );
};

export default Products;
