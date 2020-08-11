import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  background-color: #f9f9f9;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const LoadingCircle = styled.View`
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 10%;
  width: 13%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
