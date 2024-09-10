import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import MatrixCalculator from './Calculator'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MatrixCalculator />
  </React.StrictMode>,
)