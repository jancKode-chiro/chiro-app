import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';

import './App.css';
import RepsonsiveContainerGrid from './components/common/wrapper/grid-container';
import ResponsiveCard from './components/common/wrapper/card';
import { CardContent, TextField } from '@material-ui/core';

function App() {
  return (
    <div className='App'>
      <RepsonsiveContainerGrid>
        <Grid>
          <ResponsiveCard>
            <CardHeader>
              <CardContent>
                <TextField
                  label='Enter your email'
                  fullWidth
                  autoFocus
                  required
                  inputRef={(input) => console.log('input')}
                  error={false}
                  helperText={''}
                />
              </CardContent>
            </CardHeader>
          </ResponsiveCard>
        </Grid>
      </RepsonsiveContainerGrid>
    </div>
  );
}

export default App;
