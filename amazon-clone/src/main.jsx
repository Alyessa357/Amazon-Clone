import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './app/App.jsx'
import { CartProvider } from './app/providers.jsx';
import { SearchProvider } from './features/searchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
           <App />
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
