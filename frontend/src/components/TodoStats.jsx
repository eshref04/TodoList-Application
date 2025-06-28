import React from 'react';
import styled from 'styled-components';

const StatsBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  background: linear-gradient(135deg, #f7f7fa 0%, #e8e8e8 100%);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: #764ba2;
  font-weight: 600;
  min-width: 100px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.8;
`;

const TodoStats = ({ stats }) => (
  <StatsBox>
    <Stat>
      <StatNumber>{stats.total}</StatNumber>
      <StatLabel>Ümumi</StatLabel>
    </Stat>
    <Stat>
      <StatNumber>{stats.completed}</StatNumber>
      <StatLabel>Tamamlanan</StatLabel>
    </Stat>
    <Stat>
      <StatNumber>{stats.pending}</StatNumber>
      <StatLabel>Gözləyən</StatLabel>
    </Stat>
  </StatsBox>
);

export default TodoStats; 