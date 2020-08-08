import React from 'react';

import { useTheme } from 'styled-components';

import { Container, Spinner } from './styles';

const Loading: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <Spinner size="small" color={colors.primary} />
    </Container>
  );
};

export default Loading;
