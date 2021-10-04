import React from 'react';
import './App.css';

import Login from './views/authenthication/login/login';

function App() {
  return (
    <div className="App">
      {/* <CardWithImage>
        <CustomInput name='email' 
          placeholder='Email'
        />
        { spacer('27px')}
         <CustomInput name='email' 
          placeholder='Password'
        />
      </CardWithImage> */}
      <Login />
    </div>
  );
}

export default App;
