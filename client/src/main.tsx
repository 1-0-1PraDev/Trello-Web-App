import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { TaskProvider } from './context/TaskContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
