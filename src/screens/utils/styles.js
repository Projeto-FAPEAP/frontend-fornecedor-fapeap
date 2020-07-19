import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  background-color: #00000040;
  justify-content: center;
`;

export const LoadingCircle = styled.View`
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: ${hp('10%')}px;
  width: ${wp('18%')}px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
