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


  a {
    color: inherit;
    text-decoration: none;
  }
`;
