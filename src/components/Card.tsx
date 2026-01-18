import styled from 'styled-components';

export const Card = styled.div`
  background: var(--panel-bg);
  border-radius: 14px;
  padding: 20px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--panel-border);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
  }
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 18px;
  color: var(--text-primary);
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;
