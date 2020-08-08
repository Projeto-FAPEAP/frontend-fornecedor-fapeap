import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  TextInputProps,
  TextInput as RNInput,
  ViewStyle,
  StyleProp,
} from 'react-native';

import { useField } from '@unform/core';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  editable?: boolean;
  label?: string;
  icon?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface IInputReference extends RNInput {
  value: string;
}

const Input: React.FC<IInputProps> = (props) => {
  const { name, label, editable, icon, ...rest } = props;
  const { containerStyle } = props;

  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const inputRef = useRef<IInputReference>({
    value: defaultValue,
  } as IInputReference);

  useEffect(() => {
    inputRef.current.value = defaultValue;

    setIsFilled(!!defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
        setIsFilled(!!value);
      },
      getValue(ref) {
        return ref.value || '';
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <S.Container style={containerStyle}>
      {isFilled && <S.Label>{label}</S.Label>}
      <S.ContentInput
        isFocused={isFocused}
        isErrored={!!error}
        isFilled={isFilled}
      >
        {icon && (
          <S.Icon
            color={isFocused || isFilled ? colors.primary : colors.regular}
            name={icon}
            size={20}
          />
        )}
        <S.TextInput
          ref={inputRef}
          placeholderTextColor={colors.regular}
          defaultValue={defaultValue}
          editable={editable}
          onChangeText={(value) => {
            if (inputRef.current) {
              inputRef.current.value = value;
            }
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          numberOfLines={1}
          {...rest}
        />
      </S.ContentInput>

      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
};

Input.defaultProps = {
  editable: true,
};

export default Input;
