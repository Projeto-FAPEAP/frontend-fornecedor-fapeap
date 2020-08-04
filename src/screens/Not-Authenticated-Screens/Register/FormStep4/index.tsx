import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { ImagePickerResponse } from 'react-native-image-picker';

import SelectDocument from '@libs/SelectDocument';
import SelectPhoto from '@libs/SelectPhoto';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface IFormStep4Props {
  images: ImagePickerResponse[];
  video: DocumentPickerResponse | undefined;
  handleSetImages: React.Dispatch<React.SetStateAction<ImagePickerResponse[]>>;
  handleSetVideo: React.Dispatch<
    React.SetStateAction<DocumentPickerResponse | undefined>
  >;
}

const FormStep4: React.FC<IFormStep4Props> = (props) => {
  const { handleSetImages, handleSetVideo } = props;
  const { images, video } = props;
  const { colors } = useTheme();
  const [loadingImage, setLoadingImage] = React.useState(false);
  const [loadingVideo, setLoadingVideo] = React.useState(false);

  const qntImages = React.useMemo(() => images.length, [images]);
  const qntVideo = React.useMemo(() => (video ? 1 : 0), [video]);

  const handleSelectImage = React.useCallback(async () => {
    setLoadingImage(true);
    const document = await SelectPhoto();
    if (document) {
      handleSetImages((state) => [...state, document]);
    }
    setLoadingImage(false);
  }, [handleSetImages]);

  const handleSelectVideo = useCallback(async () => {
    setLoadingVideo(true);
    const document = await SelectDocument();
    if (document) {
      handleSetVideo(document);
    }
    setLoadingVideo(false);
  }, [handleSetVideo]);

  const handleDeleteVideo = useCallback(() => {
    handleSetVideo(undefined);
  }, [handleSetVideo]);

  const handleDeleteImage = useCallback(
    (idx) => {
      handleSetImages((state) => state.filter((_img, index) => idx !== index));
    },
    [handleSetImages],
  );

  return (
    <S.ContainerDocuments>
      <S.ContentDocument>
        <S.Title>Fotos do estabelecimento ({qntImages}/3) </S.Title>

        {images.map((image, idx) => (
          <S.ItemDocument key={image.uri}>
            <S.Icon name="check-circle" />
            <S.ItemNameDocument numberOfLines={1}>
              {image.fileName || 'Arquivo imagem'}
            </S.ItemNameDocument>
            <S.ButtonRemove onPress={() => handleDeleteImage(idx)}>
              <S.IconTrash />
            </S.ButtonRemove>
          </S.ItemDocument>
        ))}
        {qntImages < 3 && (
          <S.ButtonUpload onPress={handleSelectImage}>
            {loadingImage ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <>
                <S.IconUpload />
                <S.ButtonUploadName>Adicionar</S.ButtonUploadName>
              </>
            )}
          </S.ButtonUpload>
        )}
      </S.ContentDocument>

      <S.ContentDocument>
        <S.Title>Vídeo do processo produtivo ({qntVideo}/1)</S.Title>

        {video && (
          <S.ItemDocument>
            <S.Icon name="check-circle" />
            <S.ItemNameDocument numberOfLines={1}>
              {video.name}
            </S.ItemNameDocument>
            <S.ButtonRemove onPress={handleDeleteVideo}>
              <S.IconTrash />
            </S.ButtonRemove>
          </S.ItemDocument>
        )}
        {!video && (
          <S.ButtonUpload onPress={handleSelectVideo}>
            {loadingVideo ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <>
                <S.IconUpload />
                <S.ButtonUploadName>Adicionar</S.ButtonUploadName>
              </>
            )}
          </S.ButtonUpload>
        )}
      </S.ContentDocument>
    </S.ContainerDocuments>
  );
};

export default FormStep4;
