import {StyleProp, StyleSheet, TextInput, ViewStyle} from 'react-native';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import globalStyle from '../constants/globalStyle';

type Props = {
  todo: Todo | null;
  isVisible: boolean;
  confirmText: string;
  onConfirm: (title: string) => void;
  onClose: () => void;
};

export default function TodoDialog({
  isVisible,
  confirmText,
  onConfirm,
  onClose,
}: Props) {
  const [inputTitle, setinputTitle] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const confirm = () => {
    onConfirm(inputTitle);
    setinputTitle('');
  };

  return (
    <ConfirmDialog
      dialogStyle={styles.dialogContainer}
      animationType="fade"
      contentInsetAdjustmentBehavior="always"
      onShow={() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      }}
      onRequestClose={onClose}
      onTouchOutside={onClose}
      visible={isVisible}
      positiveButton={{
        onPress: () => confirm(),
        title: confirmText,
        style: styles.button as StyleProp<ViewStyle>,
      }}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Nueva Tarea"
        value={inputTitle}
        onChangeText={setinputTitle}
        onSubmitEditing={() => confirm()}
      />
    </ConfirmDialog>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: globalStyle.backgroundColor,
    borderRadius: globalStyle.borderRadius,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: globalStyle.textColor,
    borderStyle: 'solid',
    color: globalStyle.textColor,
  },
  button: {
    color: globalStyle.accentColor,
  },
});
