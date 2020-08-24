import React from 'react';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import * as S from './styles';

interface IButtonVideoProps extends TouchableOpacityProps {
  url?: string;
  onRemove(): void;
  onPress(): Promise<void>;
}

const ButtonVideo: React.FC<IButtonVideoProps> = (props) => {
  const { url, onRemove, onPress, ...rest } = props;
  const { colors } = useTheme();
  const [loading, setLoading] = React.useState(false);

  const handlePress = React.useCallback(async () => {
    setLoading(true);

    try {
      await onPress();
    } catch {
      //
    }

    setLoading(false);
  }, [onPress]);

  const handleDelete = React.useCallback(() => {
    setLoading(true);

    try {
      onRemove();
    } catch {
      //
    }

    setLoading(false);
  }, [onRemove]);

  return (
    <S.VideoButton {...rest} onPress={handlePress}>
      {loading && (
        <S.ContentLoading>
          <ActivityIndicator size="small" color={colors.white} />
        </S.ContentLoading>
      )}
      {!url && <S.IconVideo />}
      {!!url && (
        <>
          <S.ButtonTrash onPress={handleDelete}>
            <S.IconTrash />
          </S.ButtonTrash>
          <S.Video source={{ uri: url }} />
        </>
      )}
    </S.VideoButton>
  );
};

export default React.memo(ButtonVideo);
