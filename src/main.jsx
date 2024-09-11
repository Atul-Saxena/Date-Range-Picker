import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RangeProvider } from './Context/Range.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RangeProvider>
        <App />
    </RangeProvider>
  </StrictMode>,
)
