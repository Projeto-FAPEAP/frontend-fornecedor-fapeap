import FaIcon from 'react-native-vector-icons/FontAwesome';

import iconUpload from '@assets/selectimage.png';
import styled from 'styled-components/native';

export const ContainerDocuments = styled.View`
  width: 100%;
`;

export const ItemDocument = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 0.7px;
  padding: 0 20px;
  height: 44px;
  margin-bottom: 5px;

  border-radius: 5px;
`;

export const ItemNameDocument = styled.Text`
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
  font-size: 14px;
  flex: 1;
`;

export const ContentDocument = styled.View`
  margin-bottom: 34px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
  font-size: 18px;
  margin-bottom: 10px;
`;

export const SubtitleView = styled.View`
  flex-direction: row;
  margin-top: 12px;
  align-items: center;
`;

export const Icon = styled(FaIcon)`
  color: ${({ theme }) => theme.colors.success};
  font-size: 22px;
  margin-right: 8px;
`;

export const Subititle = styled.Text`
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  font-size: 14px;
`;

export const ButtonUpload = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  margin-top: 15px;
  height: 50px;
  border-width: 0.7px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.darker};

  justify-content: center;
  align-items: center;
`;

export const ButtonUploadName = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  color: ${({ theme }) => theme.colors.darker};
  margin-left: 10px;
`;

export const IconUpload = styled.Image.attrs({
  source: iconUpload,
})`
  resize-mode: contain;
  height: 30px;
  width: 30px;
`;

export const ButtonRemove = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
  hitSlop: { top: 10, bottom: 10, right: 10, left: 10 },
})`
  margin-left: auto;
`;

export const IconTrash = styled(FaIcon).attrs({
  name: 'trash',
})`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 20px;
`;
