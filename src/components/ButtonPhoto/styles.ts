import { TouchableOpacityProps } from 'react-native';
import FaIcon from 'react-native-vector-icons/Feather';

import selectImage from '@assets/selectimage.png';
import styled from 'styled-components/native';

export const PhotoButton = styled.TouchableOpacity.attrs<TouchableOpacityProps>(
  {
    activeOpacity: 0.8,
  },
)`
  height: ${({ theme }) => theme.screen.width / 2 - 15}px;
  width: ${({ theme }) => theme.screen.width / 2 - 15}px;

  max-width: 200px;
  max-height: 200px;

  justify-content: center;
  align-items: center;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.metrics.border}px;
  border-style: dashed;
`;

export const IconPhoto = styled.Image.attrs({
  source: selectImage,
})``;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.border}px;
`;

export const ContentLoading = styled.View`
  background: ${({ theme }) => theme.colors.darkTransparent};
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
`;

export const ButtonTrash = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  width: 45px;
  height: 45px;
  background: ${({ theme }) => theme.colors.darkTransparent};
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 30px;
  border-top-right-radius: ${({ theme }) => theme.metrics.border}px;
  z-index: 5;
`;

export const IconTrash = styled(FaIcon).attrs({
  name: 'trash',
})`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.danger};
`;
