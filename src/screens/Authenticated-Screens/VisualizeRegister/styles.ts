import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Buttonn from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  background: #fff;
  flex: 1;
  padding: 10px;
`;

export const MainTitle = styled.Text`
  font-size: 18px;
  margin: 15px auto 30px;
  color: #3e3e54;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
`;

export const Title = styled.Text`
  font-size: 15px;
  color:#8f8fa1
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const SubTitle = styled.Text`
  padding-top: 3px;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;

export const TextWrapper = styled.View`
  max-width: 100%;
  min-width: 50%;
  padding-vertical: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const Agroup = styled.View`
  flex-direction: row;
`;

export const VideoWrapper = styled.View`
  width: 100%;
  height: 250px;
  border-width: 1px;
`;

export const ContentVideo = styled.View`
  height: 250px;
  width: 100%;
`;

export const ContentPhotos = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 5px;
`;

export const PhotoWrapper = styled.View`
  height: ${({ theme }) => theme.screen.width / 2 - 15}px;
  width: ${({ theme }) => theme.screen.width / 2 - 15}px;

  max-width: 200px;
  max-height: 200px;

  justify-content: center;
  align-items: center;

  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.metrics.border}px;
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.metrics.border}px;
`;
