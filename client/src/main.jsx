import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css'
import App from './App.jsx'


const client = new ApolloClient({
  uri: 'https://giit-server1.onrender.com/api',
  cache: new InMemoryCache()
});


createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
