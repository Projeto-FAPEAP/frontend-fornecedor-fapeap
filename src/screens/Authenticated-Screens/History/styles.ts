import Button from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View``;
export const EmptyView = styled.View`
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;
export const ButtonReload = styled(Button)`
  background:${(props) => props.theme.colors.primary}
  bottom:20px;
  right:20px
  position: absolute;
  height:50px;
  width:50px;
  border-radius:60px;
  z-index:2;
`;
