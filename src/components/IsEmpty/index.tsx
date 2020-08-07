import React from 'react';

import { Container, Title, Icon } from './styles';

interface IsEmptyProps {
  icon?: string;
  children: React.ReactNode;
}

const IsEmpty: React.FC<IsEmptyProps> = ({ children, icon }) => {
  if (typeof children === 'string') {
    return (
      <Container>
        {icon && <Icon name={icon} />}
        <Title> {children} </Title>
      </Container>
    );
  }

  return (
    <Container>
      {icon && <Icon name={icon} />}
      {children}
    </Container>
  );
};

export default IsEmpty;
