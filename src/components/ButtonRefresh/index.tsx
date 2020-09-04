import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import * as S from './styles';

interface IButtonProps extends RectButtonProperties {
  onPress(): Promise<void>;
}

const ButtonRefresh: React.FC<IButtonProps> = (props) => {
  const { onPress, ...rest } = props;
  const handlePress = React.useCallback(async () => {
    try {
      await onPress();
    } catch {
      //
    }
  }, [onPress]);
  return (
    <S.Container {...rest} onPress={handlePress}>
      <S.IconSuccess />
    </S.Container>
  );
};

export default ButtonRefresh;
