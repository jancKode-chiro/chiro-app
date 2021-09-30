import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';

import './App.css';
import RepsonsiveContainerGrid from './components/common/wrapper/grid-container';
import ResponsiveCard from './components/common/wrapper/card';
import { CardContent, TextField, Card } from '@material-ui/core';
import { url } from 'inspector';

import CardWithImage from './components/common/wrapper/card-with-image';

function App() {
  return (
    <div className='App'>
      <CardWithImage>
        <h1>Log in contents here</h1>
      </CardWithImage>
    </div>
  );
}

export default App;
