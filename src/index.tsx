import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
// import store from './redux/store';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Provider store={store}> */}
        <App />
      {/* </Provider> */}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
