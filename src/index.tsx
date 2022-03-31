import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';

const queryClient = new QueryClient();


ReactDOM.render(

  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,

  document.getElementById('root')
);
