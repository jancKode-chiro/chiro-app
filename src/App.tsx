import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';

import './App.css';
import RepsonsiveContainerGrid from './components/common/wrapper/grid-container';
import ResponsiveCard from './components/common/wrapper/card';
import { CardContent, TextField, Card } from '@material-ui/core';
import { url } from 'inspector';

import CardWithImage from './components/common/wrapper/card-with-image';
import CustomInput from './components/common/forms/custom-input/custom-input'
import spacer from './components/common/spacer/spacer';

function App() {
  return (
    <div className='App'>
      <CardWithImage>
        <CustomInput name='email' 
          placeholder='Email'
        />
        {spacer('27px')}
         <CustomInput name='email' 
          placeholder='Email'
        />
      </CardWithImage>
    </div>
  );
}

export default App;
