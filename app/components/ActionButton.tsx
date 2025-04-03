import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle from '../constants/globalStyle';
import { Icon } from '@rneui/base';

type Props = {
  onPress: () => void;
};

export default function ActionButton({onPress}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.button}>
        <Icon name='add' size={40} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    backgroundColor: globalStyle.accentColor,
    margin: 20,
    padding: 8,
    borderRadius: globalStyle.borderRadius,
  },
  icon: {
    color: globalStyle.textColor
  }
});
