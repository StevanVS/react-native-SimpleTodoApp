import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle from '../constants/globalStyle';
import {CheckBox} from '@rneui/base';

type Props = {
  todo: Todo;
  onCompleteToggle: (id: string) => void;
};

export default function TodoItem({todo, onCompleteToggle}: Props) {
  return (
    <View style={styles.container}>
      <CheckBox
        checkedColor={globalStyle.accentColor}
        containerStyle={styles.checkBox}
        checked={todo.isComplete}
        onPress={() => onCompleteToggle(todo.id)}
        iconType="material"
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
      />
      <Text style={styles.text}>{todo.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  checkBox: {
    padding: 0,
    margin: 0,
    backgroundColor: globalStyle.backgroundColor,
  },
  text: {
    color: globalStyle.textColor,
  },
});
