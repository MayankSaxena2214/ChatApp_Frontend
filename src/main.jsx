import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// export const server='http://localhost:3030';
export const server='https://chatapp-backend-rgka.onrender.com';
import {Provider} from "react-redux"
import store from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </StrictMode>,
  </Provider>
)
