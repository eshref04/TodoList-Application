import React from 'react';
import styled from 'styled-components';
import { FiTrash2, FiCheck, FiEdit2 } from 'react-icons/fi';

const Item = styled.li`
  display: flex;
  align-items: center;
  background: ${({ completed }) => (completed === 'true' ? '#e0e7ff' : '#f7f7fa')};
  border-radius: 12px;
  margin-bottom: 0.8rem;
  padding: 1rem 1.2rem;
  transition: all 0.3s;
  text-decoration: ${({ completed }) => (completed === 'true' ? 'line-through' : 'none')};
  opacity: ${({ completed }) => (completed === 'true' ? 0.7 : 1)};
  flex-wrap: wrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Texts = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Title = styled.span`
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
  display: block;
  margin-bottom: 0.3rem;
`;

const Desc = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin-top: 0.3rem;
  line-height: 1.4;
`;

const Meta = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #764ba2;
  font-size: 1.3rem;
  margin-left: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0.5rem;
  border-radius: 8px;
  
  &:hover {
    color: #e74c3c;
    background: rgba(231, 76, 60, 0.1);
    transform: scale(1.1);
  }
`;

const CheckButton = styled(IconButton)`
  color: #2ecc40;
  
  &:hover {
    color: #27ae60;
    background: rgba(46, 204, 64, 0.1);
  }
`;

const EditButton = styled(IconButton)`
  color: #3498db;
  
  &:hover {
    color: #2980b9;
    background: rgba(52, 152, 219, 0.1);
  }
`;

const Priority = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  background: ${({ p }) => p==='high' ? '#e74c3c' : p==='medium' ? '#f1c40f' : '#2ecc40'};
  color: #fff;
  border-radius: 8px;
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Due = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #666;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
`;

const Status = styled.span`
  font-size: 0.85rem;
  color: ${({ completed }) => completed === 'true' ? '#27ae60' : '#e67e22'};
  font-weight: 600;
`;

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  // Güvenli completed değeri kontrolü
  const isCompleted = todo.completed === true || todo.completed === 'true';
  const completedString = isCompleted ? 'true' : 'false';

  return (
    <Item completed={completedString}>
      <Texts>
        <Title>{todo.title}</Title>
        {todo.description && <Desc>{todo.description}</Desc>}
        <Meta>
          {todo.priority && <Priority p={todo.priority}>{todo.priority}</Priority>}
          {todo.due_date && (
            <Due>
              ⏰ {new Date(todo.due_date).toLocaleDateString('az-AZ')}
            </Due>
          )}
          <Status completed={completedString}>
            {isCompleted ? '✓ Tamamlandı' : '⏳ Gözləyir'}
          </Status>
        </Meta>
      </Texts>
      <CheckButton title="Tamamlandı kimi işarələ" onClick={onToggle}>
        <FiCheck />
      </CheckButton>
      <EditButton title="Redaktə et" onClick={onEdit}>
        <FiEdit2 />
      </EditButton>
      <IconButton title="Sil" onClick={onDelete}>
        <FiTrash2 />
      </IconButton>
    </Item>
  );
};

export default TodoItem; 