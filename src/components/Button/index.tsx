import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import * as S from './styles';

interface IButtonProps extends RectButtonProperties {
  children: string | number;
  loading?: boolean;
  disabled?: boolean;
  colorText?: string;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { children, loading, disabled, colorText, ...buttonProps } = props;
  const { colors } = useTheme();

  const enabled = React.useMemo(() => {
    if (disabled === undefined) {
      return !loading;
    }

    return !disabled;
  }, [disabled, loading]);

  return (
    <S.Container {...buttonProps} enabled={enabled}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <S.ButtonText color={colorText}>{children}</S.ButtonText>
      )}
    </S.Container>
  );
};

Button.defaultProps = {
  loading: false,
  disabled: undefined,
};

export default Button;
