import React from 'react';
import './App.css';
import CreateAccount from './views/authenthication/createaccount/createaccount';
import AboutUsPage from './views/about/about';
import Login from './views/authenthication/login/login';
import LetsTalk from './views/letstalk/letstalk';
import ActivationCode from './views/activationcode/activationcode';

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
      {/* <Login /> */}
      {/* <CreateAccount /> */}
      {/* <AboutUsPage /> */}
      {/* <LetsTalk /> */}
      <ActivationCode />
    </div>
  );
}

export default App;
