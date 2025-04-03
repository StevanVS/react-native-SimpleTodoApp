import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TodoItem from './TodoItem';
import globalStyle from '../constants/globalStyle';

type Props = {
  todos: Todo[];
  onCompleteToggle: (id: string) => void;
};

export default function TodoList({todos, onCompleteToggle}: Props) {
  const separator = () => <View style={styles.separator} />;

  return (
    <FlatList
      style={styles.container}
      data={todos}
      renderItem={({item}) => (
        <TodoItem todo={item} onCompleteToggle={onCompleteToggle} />
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
