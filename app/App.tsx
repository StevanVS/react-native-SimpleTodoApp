import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ActionButton from './components/ActionButton';
import TodoDialog from './components/TodoDialog';
import TodoList from './components/TodoList';
import globalStyle from './constants/globalStyle';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

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

  const newTodo = () => {
    setTodoToEdit(null);
    setIsDialogVisible(true);
  };

  const openTodo = (todo: Todo) => {
    setTodoToEdit(todo);
    setIsDialogVisible(true);
  };

  const addOrEditTodo = (title: string, id?: string) => {
    const newTodos = [...todos];

    if (id) {
      const index = newTodos.findIndex(t => t.id === id);
      newTodos[index].title = title;
    } else {
      const todo: Todo = {id: Date.now().toString(), title, isComplete: false};
      newTodos.push(todo);
    }

    setTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(t => t.id === id);
    if (index === -1) return;

    newTodos.splice(index, 1);

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Todo</Text>
        </View>

        <TodoList
          todos={todos}
          onOpenTodo={openTodo}
          onToggleComplete={toggleComplete}
        />
        <ActionButton onPress={newTodo} />
        <TodoDialog
          todo={todoToEdit}
          isVisible={isDialogVisible}
          onClose={() => {
            setIsDialogVisible(false);
          }}
          onConfirm={(title, id) => {
            setIsDialogVisible(false);
            addOrEditTodo(title, id);
          }}
          onDelete={id => {
            setIsDialogVisible(false);
            deleteTodo(id);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.backgroundColor,
    color: globalStyle.textColor,
  },
  header: {
    paddingLeft: 25,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: globalStyle.textColor,
  },
});
