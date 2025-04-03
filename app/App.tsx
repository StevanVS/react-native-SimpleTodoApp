import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ActionButton from './components/ActionButton';
import TodoDialog from './components/TodoDialog';
import TodoList from './components/TodoList';
import globalStyle from './constants/globalStyle';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Icon} from '@rneui/base';
import ContextMenu from 'react-native-context-menu-view';

export default function App() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isCompletedHidden, setIsCompletedHidden] = useState(false);

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

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (isCompletedHidden) {
      setFilteredTodos(todos.filter(t => t.isComplete === false));
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, isCompletedHidden]);

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
      <StatusBar backgroundColor={globalStyle.backgroundColor} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Todo</Text>
          <ContextMenu
            dropdownMenuMode={true}
            actions={[
              {
                title: isCompletedHidden
                  ? 'Mostrar completados'
                  : 'Ocultar completados',
              },
            ]}
            onPress={e => {
              switch (e.nativeEvent.index) {
                case 0: {
                  setIsCompletedHidden(!isCompletedHidden);
                  break;
                }
              }
            }}>
            <Icon name="more-vert" size={30} color={globalStyle.textColor} />
          </ContextMenu>
        </View>

        <TodoList
          todos={filteredTodos}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: globalStyle.textColor,
  },
});
