import styled from 'styled-components';

const fieldBase = `
  width: 100%;
  padding: 11px 12px;
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  font-size: 14px;
  margin-bottom: 15px;
  background: var(--panel-bg);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--evernote-green);
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
  }
`;

export const Input = styled.input`
  ${fieldBase}
`;

export const Textarea = styled.textarea`
  ${fieldBase}
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: var(--text-muted);
`;

export const Select = styled.select`
  ${fieldBase}
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #b9b9b9 50%),
    linear-gradient(135deg, #b9b9b9 50%, transparent 50%);
  background-position: calc(100% - 18px) 18px, calc(100% - 13px) 18px;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  padding-right: 34px;

  &:hover {
    background-color: #2c2c2c;
  }
`;
