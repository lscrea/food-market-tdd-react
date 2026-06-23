import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './app/cart-state/cart-slice.ts'


const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
