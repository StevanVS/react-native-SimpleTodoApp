import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle from '../constants/globalStyle';
import CheckBox from 'react-native-check-box';

type Props = {
  todo: Todo;
  onOpenTodo: (todo: Todo) => void;
  onToggleComplete: (id: string) => void;
};

export default function TodoItem({todo, onOpenTodo, onToggleComplete}: Props) {
  return (
    <Pressable onPress={() => onOpenTodo(todo)}>
      <View style={styles.container}>
        <CheckBox
          isChecked={todo.isComplete}
          onClick={() => onToggleComplete(todo.id)}
          style={styles.checkBox}
          checkBoxColor={globalStyle.accentColor}
          uncheckedCheckBoxColor={globalStyle.textColor}
        />
        <Text
          style={[styles.text, todo.isComplete ? styles.textComplete : null]}>
          {todo.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  checkBox: {
    padding: 5,
    margin: 5,
    backgroundColor: 'transparent',
  },
  text: {
    color: globalStyle.textColor,
  },
  textComplete: {
    filter: 'brightness(0.75)',
    textDecorationLine: 'line-through',
  },
});
