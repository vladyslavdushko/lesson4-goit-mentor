import { Grid, TodoListItem } from '..';

const TodoList = ({ todos }) => {
  return (
    <Grid>
      {todos.map(({ text, id }, index) => (
        <TodoListItem number={index + 1} key={id}>
          {text}
        </TodoListItem>
      ))}
    </Grid>
  );
};

export default TodoList;
