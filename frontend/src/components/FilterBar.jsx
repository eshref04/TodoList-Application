import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabGroup = styled.div`
  display: flex;
  background: #f7f7fa;
  border-radius: 10px;
  padding: 0.3rem;
  gap: 0.2rem;
`;

const Tab = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
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

const FilterBar = ({ completed, setCompleted, priority, setPriority }) => {
  const completedOptions = [
    { value: '', label: 'Hamısı' },
    { value: 'true', label: 'Tamamlanan' },
    { value: 'false', label: 'Gözləyən' }
  ];
  
  const priorityOptions = [
    { value: '', label: 'Hamısı' },
    { value: 'low', label: 'Aşağı' },
    { value: 'medium', label: 'Orta' },
    { value: 'high', label: 'Yüksək' }
  ];

  return (
    <Bar>
      <TabGroup>
        {completedOptions.map(option => (
          <Tab
            key={option.value}
            active={completed === option.value}
            onClick={() => setCompleted(option.value)}
          >
            {option.label}
          </Tab>
        ))}
      </TabGroup>
      
      <TabGroup>
        {priorityOptions.map(option => (
          <Tab
            key={option.value}
            active={priority === option.value}
            onClick={() => setPriority(option.value)}
          >
            {option.label}
          </Tab>
        ))}
      </TabGroup>
    </Bar>
  );
};

export default FilterBar; 