import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle from '../constants/globalStyle';
import {CheckBox} from '@rneui/base';

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
          checkedColor={globalStyle.accentColor}
          containerStyle={styles.checkBox}
          checked={todo.isComplete}
          onPress={() => onToggleComplete(todo.id)}
          iconType="material"
          checkedIcon="check-box"
          uncheckedIcon="check-box-outline-blank"
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
