import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { ImagePickerResponse } from 'react-native-image-picker';

import KeyboardView from '@components/KeyboardView';
import { useNavigation, StackActions } from '@react-navigation/native';
import api from '@services/api';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import getValidationErrors from '@utils/getValidationErrors';
import { darken } from 'polished';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormStep4 from './FormStep4';
import * as S from './styles';

interface ISubmitForm {
  nome: string;
  email: string;
  senha: string;
  password_confirmation: string;
  cpf_cnpj: string;
  nome_fantasia: string;
  telefone: string;
  telefone_whatsapp: string;
  cep: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
}

interface IFormDataStep1 {
  nome: string;
  email: string;
  cpf_cnpj: string;
  senha: string;
  password_confirmation: string;
}

interface IFormDataStep2 {
  nome_fantasia: string;
  telefone: string;
  telefone_whatsapp: string;
}

interface IFormDataStep3 {
  cep: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);
  const { colors } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [subtitle, setSubtitle] = React.useState('');
  const [images, setImages] = React.useState<ImagePickerResponse[]>([]);
  const [video, setVideo] = React.useState<DocumentPickerResponse>();
  const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);

  const [dataStep1, setDataStep1] = React.useState<IFormDataStep1>(
    {} as IFormDataStep1,
  );
  const [dataStep2, setDataStep2] = React.useState<IFormDataStep2>(
    {} as IFormDataStep2,
  );
  const [dataStep3, setDataStep3] = React.useState<IFormDataStep3>(
    {} as IFormDataStep3,
  );

  const formData = React.useMemo(
    () => ({ ...dataStep1, ...dataStep2, ...dataStep3 }),
    [dataStep1, dataStep2, dataStep3],
  );

  React.useEffect(() => {
    switch (step) {
      case 1:
        setSubtitle(
          'Primeiramente, precisamos de seus dados pessoais e de acesso',
        );
        break;
      case 2:
        setSubtitle('Agora precisamos dos dados de seu estabelecimento');
        break;
      case 3:
        setSubtitle('Onde seu estabelecimento fica localizado?');
        break;
      case 4:
        setSubtitle(
          'Agora precisamos que você nos envie algumas fotos do seu estabelecimento e um vídeo de até 1 minuto do processo produtivo',
        );
        break;
      default:
        setSubtitle('Etapa não identificada');
        break;
    }

    if (step < 4) {
      formRef.current?.setData(formData);
      formRef.current?.setErrors({});
    }
  }, [formData, step]);

  React.useEffect(() => {
    function onKeyboardDidShow(): void {
      setKeyboardIsOpen(true);
    }

    function onKeyboardDidHide(): void {
      setKeyboardIsOpen(false);
    }

    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, [keyboardIsOpen]);

  const handleSubmit = React.useCallback(
    async (data: ISubmitForm) => {
      formRef.current?.setErrors({});
      if (step === 1) {
        try {
          const schemaStep1 = Yup.object().shape({
            nome: Yup.string().required('Campo obrigatório'),
            email: Yup.string()
              .email('Informe um email válido')
              .required('Campo obrigatório'),
            cpf_cnpj: Yup.string().required('Campo obrigatório'),
            senha: Yup.string()
              .min(3, 'Você deve informar no mínimo 4 caracteres')
              .required('Senha é obrigatória'),
            password_confirmation: Yup.string()
              .oneOf([Yup.ref('senha')], 'Senhas não coincidem')
              .required('A confirmação da senha é obrigatória'),
          });

          const objectFormData = Object.assign(formData, {
            nome: data.nome,
            email: data.email,
            cpf_cnpj: data.cpf_cnpj,
            senha: data.senha,
            password_confirmation: data.password_confirmation,
          });

          const { nome, email, cpf_cnpj } = objectFormData;
          const { senha, password_confirmation } = objectFormData;

          console.log(objectFormData);

          await schemaStep1.validate(
            { nome, email, senha, password_confirmation, cpf_cnpj },
            { abortEarly: false },
          );
          setDataStep1({ nome, cpf_cnpj, email, senha, password_confirmation });

          setStep(step + 1);
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
          }
        }
      } else if (step === 2) {
        try {
          const schemaStep2 = Yup.object().shape({
            nome_fantasia: Yup.string().required('Campo obrigatório'),
            telefone: Yup.string().required('Campo obrigatório'),
            telefone_whatsapp: Yup.string().required('Campo obrigatório'),
          });

          const objectFormData = Object.assign(formData, {
            nome_fantasia: data.nome_fantasia,
            telefone: data.telefone,
            telefone_whatsapp: data.telefone_whatsapp,
          });

          const { nome_fantasia } = objectFormData;
          const { telefone, telefone_whatsapp } = objectFormData;

          console.log(objectFormData);

          await schemaStep2.validate(
            { nome_fantasia, telefone, telefone_whatsapp },
            { abortEarly: false },
          );
          setDataStep2({
            nome_fantasia,
            telefone,
            telefone_whatsapp,
          });

          setStep(step + 1);
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
          }
        }
      } else if (step === 3) {
        try {
          const schemaStep3 = Yup.object().shape({
            cep: Yup.string().required('Campo obrigatório'),
            logradouro: Yup.string().required('Campo obrigatório'),
            bairro: Yup.string().required('Campo obrigatório'),
            numero_local: Yup.string().required('Campo obrigatório'),
          });

          const objectFormData = Object.assign(formData, {
            cep: data.cep,
            logradouro: data.logradouro,
            bairro: data.bairro,
            numero_local: data.numero_local,
          });

          const { cep, logradouro } = objectFormData;
          const { bairro, numero_local } = objectFormData;

          console.log(objectFormData);

          await schemaStep3.validate(
            { cep, logradouro, bairro, numero_local },
            { abortEarly: false },
          );
          setDataStep3({
            cep,
            logradouro,
            bairro,
            numero_local,
          });

          setStep(step + 1);
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
          }
        }
      } else if (step === 4) {
        if (images.length === 0) {
          Alert.alert(
            'Atenção',
            'Você deve nos enviar pelo menos uma imagem de seu estabelecimento ',
          );
          return;
        }
        if (!video) {
          Alert.alert(
            'Atenção',
            'Você deve nos enviar um do processo produtivo de seu estabelecimento ',
          );
        }

        setLoading(true);

        try {
          const { password_confirmation, ...dataObj } = formData;

          const formBodyData = new FormData();

          Object.keys(dataObj).forEach((key: string) => {
            formBodyData.append(key, dataObj[key]);
          });

          formBodyData.append('file', video);

          images.forEach((image) => {
            formBodyData.append('file', image);
          });

          await api.post('/fornecedor', formBodyData);

          navigation.dispatch(StackActions.replace('SuccessSubmit'));
        } catch (error) {
          const hasResponse = error.response?.data?.error;
          if (hasResponse) {
            Alert.alert('Ocorreu um erro', hasResponse);
          }
          console.log(error);
        }
        setLoading(false);
      }
    },
    [formData, images, navigation, step, video],
  );

  const submitForm = React.useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const focusTargetInput = React.useCallback((field: string) => {
    const nameInput = formRef.current?.getFieldRef(field);
    nameInput.focus();
  }, []);

  const nextStep = React.useCallback(
    (targetStep: number) => {
      if (targetStep > step) {
        Alert.alert(
          'Um momento',
          'Você deve preencher corretamente o formulário e clicar em continuar para ir para a próxima etapa.',
        );
        return;
      }
      setStep(targetStep);
    },
    [step],
  );

  return (
    <S.Container>
      <KeyboardView>
        <S.Header>
          <S.Title>Crie sua conta</S.Title>
          <S.Subtitle>{subtitle}</S.Subtitle>
        </S.Header>

        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <S.Form>
            {step === 1 && (
              <FormStep1
                formRef={formRef}
                onSubmitForm={submitForm}
                focusTargetInput={focusTargetInput}
              />
            )}
            {step === 2 && (
              <FormStep2
                formRef={formRef}
                onSubmitForm={submitForm}
                focusTargetInput={focusTargetInput}
              />
            )}
            {step === 3 && (
              <FormStep3
                formRef={formRef}
                onSubmitForm={submitForm}
                focusTargetInput={focusTargetInput}
              />
            )}
            {step === 4 && (
              <FormStep4
                images={images}
                video={video}
                handleSetImages={setImages}
                handleSetVideo={setVideo}
              />
            )}
          </S.Form>
        </FormProvider>
      </KeyboardView>

      {!keyboardIsOpen && (
        <S.Footer>
          <S.DotsContainer>
            <S.Dots
              onPress={() => nextStep(1)}
              isFilled
              color={colors.primary}
            />
            <S.Dots
              onPress={() => nextStep(2)}
              isFilled={step >= 2}
              color={darken(0.05, colors.primary)}
            />
            <S.Dots
              onPress={() => nextStep(3)}
              isFilled={step >= 3}
              color={darken(0.1, colors.primary)}
            />
            <S.Dots
              onPress={() => nextStep(4)}
              isFilled={step >= 4}
              color={darken(0.15, colors.primary)}
            />
          </S.DotsContainer>

          <S.ButtonSignIn
            onPress={() => formRef.current?.submitForm()}
            loading={loading}
          >
            Avancar
          </S.ButtonSignIn>
        </S.Footer>
      )}
    </S.Container>
  );
};

export default Login;
