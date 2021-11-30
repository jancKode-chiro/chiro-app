import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
// import store from './redux/store';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(

  <QueryClientProvider client={queryClient}>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </QueryClientProvider>,

  document.getElementById('root')
);
