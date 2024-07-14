import { Text } from 'components';
import FormTodo from 'components/FormTodo/FormTodo';
import TodoList from 'components/TodoList/TodoList';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = todoData => {
    setTodos(prevTodos => [...prevTodos, { text: todoData, id: nanoid() }]);
  };
  return (
    <>
      <FormTodo onSubmit={addTodo} />
      {todos.length === 0 ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList todos={todos} />
      )}
    </>
  );
};
