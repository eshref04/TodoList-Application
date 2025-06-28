import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoStats from './components/TodoStats';
import FilterBar from './components/FilterBar';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    margin: 0;
    font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  }
`;

const Container = styled.div`
  max-width: 520px;
  margin: 40px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.15);
  padding: 2.5rem 1rem 2rem 1rem;
  @media (max-width: 600px) {
    padding: 1.2rem 0.3rem;
    max-width: 98vw;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #764ba2;
  margin-bottom: 1.2rem;
  font-size: 2.1rem;
`;

const TabContainer = styled.div`
  display: flex;
  background: #f7f7fa;
  border-radius: 12px;
  padding: 0.3rem;
  margin-bottom: 1.5rem;
  gap: 0.2rem;
`;

const Tab = styled.button`
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  background: ${({ active }) => active ? '#764ba2' : 'transparent'};
  color: ${({ active }) => active ? '#fff' : '#666'};
  font-weight: ${({ active }) => active ? '600' : '400'};
  
  &:hover {
    background: ${({ active }) => active ? '#667eea' : '#e1e5e9'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ScrollableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const EditModeHeader = styled.div`
  background: #e0e7ff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #764ba2;
  font-weight: 600;
`;

const API = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
});

function App() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);
  const [completed, setCompleted] = useState('');
  const [priority, setPriority] = useState('');
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'view'

  // Tüm todoları ve istatistikleri getir
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const params = {};
      if (completed) params.completed = completed;
      if (priority) params.priority = priority;
      const res = await API.get('/', { params });
      // API'den gelen verinin array olduğundan emin ol
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]);
      toast.error('Tapşırıqlar yüklənərkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchStats = async () => {
    try {
      const res = await API.get('/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ total: 0, completed: 0, pending: 0 });
    }
  };

  useEffect(() => {
    if (activeTab === 'view') {
      fetchTodos();
      fetchStats();
    }
    // eslint-disable-next-line
  }, [completed, priority, activeTab]);

  // Todo ekle
  const handleAdd = async (data) => {
    try {
      const response = await API.post('/', data);
      toast.success('Tapşırıq uğurla əlavə edildi!');
      
      // Her zaman istatistikleri güncelle
      await fetchStats();
      
      // Eğer view tabındaysak todoları da güncelle
      if (activeTab === 'view') {
        await fetchTodos();
      }
      
      return response;
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Tapşırıq əlavə edilərkən xəta baş verdi');
      throw error;
    }
  };

  // Todo sil
  const handleDelete = async (id) => {
    try {
      await API.delete(`/${id}`);
      toast.success('Tapşırıq uğurla silindi!');
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Tapşırıq silinərkən xəta baş verdi');
    }
  };

  // Tamamlanma durumunu değiştir
  const handleToggle = async (id) => {
    try {
      const response = await API.patch(`/${id}/toggle`);
      const isCompleted = response.data.completed;
      toast.success(isCompleted ? 'Tapşırıq tamamlandı!' : 'Tapşırıq yenidən açıldı!');
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Error toggling todo:', error);
      toast.error('Tapşırıq statusu dəyişdirilərkən xəta baş verdi');
    }
  };

  // Todo güncelle
  const handleUpdate = async (data) => {
    try {
      await API.put(`/${editingTodo.id}`, data);
      toast.success('Tapşırıq uğurla yeniləndi!');
      setEditingTodo(null);
      fetchTodos();
      fetchStats();
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Tapşırıq yenilənərkən xəta baş verdi');
    }
  };

  // Düzenleme modunu başlat
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setActiveTab('add'); // Edit modunda add tabına geç
  };

  // Düzenleme modunu iptal et
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>📝 TodoList Application</Title>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'add'} 
            onClick={() => {
              setActiveTab('add');
              if (editingTodo) setEditingTodo(null); // Tab değişirken edit modunu iptal et
            }}
          >
            Tapşırıq Əlavə Et
          </Tab>
          <Tab 
            active={activeTab === 'view'} 
            onClick={() => {
              setActiveTab('view');
              if (editingTodo) setEditingTodo(null); // Tab değişirken edit modunu iptal et
            }}
          >
            Tapşırıqları Görüntülə
          </Tab>
        </TabContainer>

        {activeTab === 'add' ? (
          <>
            {editingTodo && (
              <EditModeHeader>
                📝 "{editingTodo.title}" tapşırığını redaktə edirsiniz
              </EditModeHeader>
            )}
            <TodoForm
              onSubmit={editingTodo ? handleUpdate : handleAdd}
              editingTodo={editingTodo}
              onCancel={handleCancelEdit}
            />
          </>
        ) : (
          <>
            <TodoStats stats={stats} />
            <FilterBar
              completed={completed}
              setCompleted={setCompleted}
              priority={priority}
              setPriority={setPriority}
            />
            {loading ? (
              <p style={{ textAlign: 'center', color: '#aaa' }}>Yüklənir...</p>
            ) : (
              <ScrollableContainer>
                <TodoList
                  todos={todos}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                />
              </ScrollableContainer>
            )}
          </>
        )}
      </Container>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
