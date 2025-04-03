import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import ActionButton from './components/ActionButton';
import TodoDialog from './components/TodoDialog';
import TodoList from './components/TodoList';
import globalStyle from './constants/globalStyle';

export default function App() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const todoToEdit: Todo | null = null;

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 'a',
      title: 'Programar',
      isComplete: true,
    },
    {
      id: 'b',
      title: 'Limpiar terraza',
      isComplete: false,
    },
    {
      id: 'c',
      title: 'Estudiar',
      isComplete: false,
    },
  ]);

  const addTodo = (title: string) => {
    const newTodos = [...todos];
    const todo: Todo = {id: Date.now().toString(), title, isComplete: false};
    newTodos.push(todo);
    setTodos(newTodos);
  };

  const toggleComplete = (id: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(t => t.id === id);
    if (index === -1) return;

    newTodos[index].isComplete = !newTodos[index].isComplete;

    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TodoList todos={todos} onCompleteToggle={toggleComplete} />
      <ActionButton
        onPress={() => {
          setIsDialogVisible(true);
        }}
      />
      <TodoDialog
        todo={todoToEdit}
        confirmText="Anadir"
        isVisible={isDialogVisible}
        onClose={() => {
          setIsDialogVisible(false);
        }}
        onConfirm={title => {
          setIsDialogVisible(false);
          addTodo(title);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.backgroundColor,
    color: globalStyle.textColor,
  },
});
