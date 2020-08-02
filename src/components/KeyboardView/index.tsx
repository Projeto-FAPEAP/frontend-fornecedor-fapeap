import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

// import * as S from './styles';

interface IKeyboardViewProps {
  children: React.ReactNode;
}

const KeyboardView: React.FC<IKeyboardViewProps> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      enabled
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
