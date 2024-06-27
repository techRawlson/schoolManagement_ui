import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
// import store from './Pages/Redux/store.js';
import { DataProvider } from './Pages/context/DataContext.jsx';
import { Provider } from 'react-redux';
import { store } from './Pages/Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <DataProvider >
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </DataProvider>

   </Provider>
  ,
)
