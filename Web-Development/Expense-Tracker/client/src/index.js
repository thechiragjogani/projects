import React from 'react';
import App from './App.js';
import { createRoot } from 'react-dom/client';
import { DataProvider } from './context/index.js';

const container = document.getElementById('react-container');
const root = createRoot(container);

root.render(
    <DataProvider>
        <App />
    </DataProvider>
);