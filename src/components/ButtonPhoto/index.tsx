import React from 'react';
import { TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

import * as S from './styles';

interface IButtonPhotoProps extends TouchableOpacityProps {
  url?: string;
  size: number;
  onRemove(): void;
  onPress(): Promise<void>;
}

const ButtonPhoto: React.FC<IButtonPhotoProps> = (props) => {
  const { size, url, onRemove, onPress, ...rest } = props;
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
    <S.PhotoButton {...rest} onPress={handlePress}>
      {loading && (
        <S.ContentLoading>
          <ActivityIndicator size="small" color={colors.white} />
        </S.ContentLoading>
      )}
      {!url && <S.IconPhoto />}
      {!!url && (
        <>
          {size > 1 ? (
            <S.ButtonTrash onPress={handleDelete}>
              <S.IconTrash />
            </S.ButtonTrash>
          ) : null}

          <S.Photo source={{ uri: url }} />
        </>
      )}
    </S.PhotoButton>
  );
};

export default React.memo(ButtonPhoto);
