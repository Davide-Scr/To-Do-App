import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, AsyncStorage } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('@todos');
      if (savedTodos !== null) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  const addTodo = () => {
    if (text) {
      const newTodos = [...todos, { key: text }];
      setTodos(newTodos);
      saveTodos(newTodos);
      setText('');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder='Add Todo'
        style={{ marginBottom: 20, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title='Add Todo' onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default App;