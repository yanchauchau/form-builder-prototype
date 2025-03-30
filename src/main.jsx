import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from './components/ui/provider';
import App from './App';
import { customTheme } from './theme/theme';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render( 
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);