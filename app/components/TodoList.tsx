import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TodoItem from './TodoItem';
import globalStyle from '../constants/globalStyle';

type Props = {
  todos: Todo[];
  onOpenTodo: (todo: Todo) => void;
  onToggleComplete: (id: string) => void;
};

export default function TodoList({todos, onOpenTodo, onToggleComplete}: Props) {
  const separator = () => <View style={styles.separator} />;

  return (
    <FlatList
      style={styles.container}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          todo={item}
          onOpenTodo={onOpenTodo}
          onToggleComplete={onToggleComplete}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: globalStyle.textColor,
  },
});
