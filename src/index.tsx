import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import 'react-toastify/dist/ReactToastify.css';

// import store from './redux/store';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(

  <QueryClientProvider client={queryClient}>
    {/* <Provider store={store}> */}
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>

    {/* </Provider> */}
  </QueryClientProvider>,

  document.getElementById('root')
);
