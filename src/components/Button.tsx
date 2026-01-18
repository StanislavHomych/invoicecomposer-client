import styled from 'styled-components';

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: var(--evernote-green);
          color: #fff;
          &:hover {
            background-color: var(--evernote-green-dark);
          }
        `;
      case 'danger':
        return `
          background-color: #d64545;
          color: #fff;
          &:hover {
            background-color: #bf3d3d;
          }
        `;
      case 'secondary':
      default:
        return `
          background-color: #2d2d2d;
          color: var(--text-primary);
          border-color: #3a3a3a;
          &:hover {
            background-color: #353535;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.25);
  }
`;
