import React from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Empty = styled.p`
  color: #aaa;
  text-align: center;
  margin: 2rem 0;
`;

const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  if (!Array.isArray(todos)) {
    console.error('todos is not an array:', todos);
    return <Empty>Məlumat yüklənərkən xəta baş verdi.</Empty>;
  }
  
  if (!todos.length) return <Empty>Hələ tapşırıq yoxdur.</Empty>;
  
  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => onDelete(todo.id)}
          onToggle={() => onToggle(todo.id)}
          onEdit={() => onEdit(todo)}
        />
      ))}
    </List>
  );
};

export default TodoList; 