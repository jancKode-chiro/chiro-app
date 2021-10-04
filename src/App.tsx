import React from 'react';
import './App.css';
import CreateAccount from './views/authenthication/createaccount/createaccount';

import Login from './views/authenthication/login/login';

function App() {
  return (
    <div className='App'>
      {/* <CardWithImage>
        <CustomInput name='email' 
          placeholder='Email'
        />
        { spacer('27px')}
         <CustomInput name='email' 
          placeholder='Password'
        />
      </CardWithImage> */}
      <CreateAccount />
    </div>
  );
}

export default App;
