import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import AuthProvider from './utilities/providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> 
      <AppContextProvider> 
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
