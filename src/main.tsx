import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)
