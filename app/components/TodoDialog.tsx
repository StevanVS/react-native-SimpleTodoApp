import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {ConfirmDialog, Dialog} from 'react-native-simple-dialogs';
import globalStyle from '../constants/globalStyle';

type Props = {
  todo: Todo | null;
  isVisible: boolean;
  onConfirm: (title: string, id?: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};

export default function TodoDialog({
  todo,
  isVisible,
  onConfirm,
  onDelete,
  onClose,
}: Props) {
  const [inputTitle, setinputTitle] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (todo) {
      setinputTitle(todo.title);
    } else {
      setinputTitle('');
    }
  }, [todo]);

  const confirm = (title: string, id?: string) => {
    if (title.trim() === '') return;
    onConfirm(title, id);
    setinputTitle('');
  };

  return (
    <Dialog
      keyboardShouldPersistTaps="handled"
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
      visible={isVisible}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Nueva Tarea"
        value={inputTitle}
        onChangeText={setinputTitle}
        onSubmitEditing={() => confirm(inputTitle, todo?.id)}
      />
      <View style={styles.buttonContainer}>
        {todo ? (
          <Pressable
            onPress={() => onDelete(todo.id)}
            android_ripple={{borderless: false}}>
            <Text style={styles.button}>ELIMINAR</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <Pressable
          onPress={() => confirm(inputTitle, todo?.id)}
          android_ripple={{borderless: false}}>
          <Text style={styles.button}>{todo ? 'EDITAR' : 'CREAR'}</Text>
        </Pressable>
      </View>
    </Dialog>
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    color: globalStyle.accentColor,
    padding: 4,
  },
});
