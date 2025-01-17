import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import Buttonn from '@components/Button';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;
  flex: 1;
`;

export const VideoProps = styled.View`
  height: 50px;
  border-radius: 2px;
  border-width: 1px;
  border-color: #b8b6b6;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 5px;
  justify-content: space-around;
`;

export const VideoPropsTextWrapper = styled.View`
  width: 80%;
`;

export const VideoPropsText = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;

export const VideoPropsButton = styled.TouchableOpacity`
  width: 10%;
`;

export const BackButtonWrapper = styled.TouchableOpacity`
  margin-top: ${hp('2.5%')}px;
  padding-left: ${hp('2.5%')}px;
`;

export const ContentPhotos = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 5px;
`;

export const MainTitle = styled.Text`
  font-size: 18px;
  margin: 15px auto 30px;
  color: #3e3e54;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.semiBold};
`;

export const Header = styled.View`
  justify-content: space-around;
`;

export const Form = styled.View`
  align-items: center;
  justify-content: flex-start;
`;

export const Footer = styled.View`
  height: ${hp('10%')}px;

  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const WrapperList = styled.View`
  height: ${hp('30%')}px;

  width: ${wp('85%')}px;
`;

export const MediaSpot = styled.View`
  height: ${hp('30%')}px;
  align-self: center;
  width: ${wp('85%')}px;
  border-width: 1px;
  border-color: #b8b6b6;
  margin-right: ${hp('.5%')}px;
  background: #fff;
`;

export const AddMediaButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MediaSpotButton = styled.TouchableOpacity`
  height: ${hp('30%')}px;
  align-self: center;
  width: ${wp('85%')}px;
  border-width: 1px;
  border-color: #b8b6b6;
  background: #fff;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${hp('5.5%')}px;
  padding-left: ${hp('5%')}px;
`;

export const Input = styled.TextInput`
  align-self: center;
  background: #fff;
  width: 85%;
  height: ${hp('6.5%')}px;
  elevation: 5;
  border-radius: 22px;
  margin-top: 26px;
  padding-horizontal: ${hp('1.8%')}px;
  padding-vertical: ${hp('1.8%')}px;
`;

export const DropdownWrappeer = styled.View`
  background: #fff;
  width: 85%;
  height: ${hp('6.5%')}px;
  elevation: 5;
  border-radius: 22px;
  margin-top: 26px;
  padding-horizontal: ${hp('1.8%')}px;
  overflow: hidden;
`;

export const Dropdown = styled.Picker`
  background: #fff;
  width: 100%;
  height: ${hp('6.5%')}px;
  color: #424242;
`;

export const P = styled.Text`
  font-size: ${hp('2.4%')}px;
  color: #000000;
  padding-vertical: ${hp('1.8%')}px;
`;

export const VideoWrapper = styled.View`
  width: 100%;
  height: 250px;
`;

export const ContentVideo = styled.View`
  height: 250px;
  width: 100%;
`;

export const RegisterButton = styled(Buttonn)`
  min-width: 45%;
  max-width: 50%;
  border-radius: 12px;
  height: 38px;
  margin-top: 25px;

  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

export const RegisterButtonText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  color: #fff;
`;

export const RetrievePasswordButton = styled.TouchableOpacity`
  border-radius: 22px;
  height: ${hp('5%')}px;
  margin-top: 25px;
  margin-right: 25px;
  margin-left: 25px;
  justify-content: center;
`;

export const RetrievePasswordText = styled.Text`
  text-align: center;
  align-content: center;
  font-size: ${hp('2.4%')}px;

  color: ${(props) => props.theme.colors.primary};
`;

export const RegularText = styled.Text`
  text-align: right;
  align-content: center;
  font-size: ${hp('2.4%')}px;
  padding-top: ${hp('3%')}px;
  width: ${wp('55%')}px;
  color: #303030;
`;

export const RemoveMediaButtonWrapper = styled.ImageBackground`
    justify-content: flex-start;
    align-items: flex-end;
  background-color:#0E1717
  height: 100%;
  width: ${wp('85%')}px;
  `;

export const MediaWrapper = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  height: ${hp('30%')}px;
  border-width: 1px;
  width: ${wp('85%')}px;
  border-color: #b8b6b6;
  align-items: flex-end;
`;

export const RemoveMedia = styled.TouchableOpacity`
  height: ${hp('8%')}px;
  width: ${wp('10%')}px;
  justify-content: center;

  align-items: center;
`;
