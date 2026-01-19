import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    --evernote-green: #4ade80;
    --evernote-green-dark: #22c55e;
    --app-bg: #1f1f1f;
    --panel-bg: #262626;
    --panel-border: #3a3a3a;
    --panel-raised: #2c2c2c;
    --text-primary: #ffffff;
    --text-muted: #d1d5db;
    --text-faint: #9ca3af;
    --shadow-soft: 0 18px 40px rgba(0, 0, 0, 0.35);
    --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-family) !important;
  }

  html {
    color: var(--text-primary);
    margin: 0 !important;
    padding: 0 !important;
    height: 100%;
  }

  body {
    font-family: var(--font-family) !important;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.6;
    letter-spacing: 0.01em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: var(--app-bg);
    color: #ffffff;
    margin: 0 !important;
    padding: 0 !important;
    height: 100%;
    overflow-x: hidden;
  }

  #root {
    font-family: var(--font-family) !important;
    color: var(--text-primary);
    margin: 0 !important;
    padding: 0 !important;
  }

  h1 {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
    font-size: 32px;
  }

  h2 {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
    font-size: 24px;
  }

  h3 {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
    font-size: 20px;
  }

  h4, h5, h6 {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  p {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  span {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  div {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  label {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  a {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
    text-decoration: none;
  }

  th, td, li, ul, ol {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
    background: var(--panel-bg);
  }

  textarea {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
    background: var(--panel-bg);
  }

  select {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
    background: var(--panel-bg);
    appearance: none;
  }

  input::placeholder,
  textarea::placeholder {
    font-weight: 300;
    color: #9ca3af;
  }

  option {
    font-family: var(--font-family) !important;
    font-weight: 300;
    background: #1f1f1f;
    color: #ffffff;
  }

  button {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  /* Для всіх svg іконок на темному фоні */
  svg {
    color: #ffffff;
  }

  /* Забезпечуємо правильний колір для всіх елементів на темному фоні */
  article, aside, details, figcaption, figure, footer, header, main, nav, section, summary {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  /* Переконаємося, що всі текстові елементи світлі */
  small {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  strong {
    font-family: var(--font-family) !important;
    font-weight: 400;
    color: #ffffff;
  }

  em {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  code, pre, blockquote {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  /* Для таблиць */
  table {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  thead, tbody, tfoot {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }

  tr {
    font-family: var(--font-family) !important;
    font-weight: 300;
    color: #ffffff;
  }
`;
