import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  max-width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const InputGroup = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
  }
  
  option {
    background: white;
    color: #333;
    padding: 0.5rem;
  }
`;

const Button = styled.button`
  background: #764ba2;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  
  &:hover {
    background: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(118, 75, 162, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CancelButton = styled(Button)`
  background: #95a5a6;
  
  &:hover {
    background: #7f8c8d;
    box-shadow: 0 4px 12px rgba(149, 165, 166, 0.3);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  text-align: left;
`;

// Tarih formatını düzeltme fonksiyonu
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    // YYYY-MM-DD formatına çevir
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

const TodoForm = ({ onSubmit, editingTodo, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority || 'medium');
      // Tarih formatını düzelt
      setDueDate(formatDateForInput(editingTodo.due_date));
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
    setErrors({});
  }, [editingTodo]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Başlıq tələb olunur';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Başlıq ən azı 3 simvol olmalıdır';
    } else if (title.trim().length > 255) {
      newErrors.title = 'Başlıq 255 simvoldan çox ola bilməz';
    }
    
    if (description.trim().length > 1000) {
      newErrors.description = 'Təsvir 1000 simvoldan çox ola bilməz';
    }
    
    if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = 'Bitmə tarixi keçmiş tarix ola bilməz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        due_date: dueDate || null,
      });
      
      if (!editingTodo) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
      }
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setErrors({});
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <InputGroup>
          <Input
            type="text"
            placeholder="Başlıq *"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            style={{ borderColor: errors.title ? '#e74c3c' : '#e1e5e9' }}
            required
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </InputGroup>
        
        <InputGroup>
          <Select 
            value={priority} 
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">Aşağı</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksək</option>
          </Select>
        </InputGroup>
        
        <InputGroup>
          <Input
            type="date"
            value={dueDate}
            onChange={e => {
              setDueDate(e.target.value);
              if (errors.dueDate) setErrors({ ...errors, dueDate: '' });
            }}
            style={{ borderColor: errors.dueDate ? '#e74c3c' : '#e1e5e9' }}
          />
          {errors.dueDate && <ErrorMessage>{errors.dueDate}</ErrorMessage>}
        </InputGroup>
      </Row>
      
      <InputGroup>
        <Textarea
          rows={3}
          placeholder="Təsvir (istəyə bağlı)"
          value={description}
          onChange={e => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: '' });
          }}
          style={{ borderColor: errors.description ? '#e74c3c' : '#e1e5e9' }}
        />
        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
      </InputGroup>
      
      <ButtonRow>
        {editingTodo && (
          <CancelButton type="button" onClick={handleCancel} disabled={isSubmitting}>
            Ləğv Et
          </CancelButton>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Göndərilir...' : (editingTodo ? 'Yenilə' : 'Əlavə Et')}
        </Button>
      </ButtonRow>
    </Form>
  );
};

export default TodoForm; 