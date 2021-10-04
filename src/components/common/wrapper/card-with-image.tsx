import React from 'react'
import Grid from '@material-ui/core/Grid';

import RepsonsiveContainerGrid from './grid-container'
import ResponsiveCard from './card'
import bg from '../../../assets/images/bg-half.png';

const CardWithImage = ({children}:any) => {
  return (
   <RepsonsiveContainerGrid className='grid-container'>
        <Grid
          style={{
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <ResponsiveCard>
            <img src={bg} alt='bg' width='100%' />
          </ResponsiveCard>
          <ResponsiveCard>
           {children}
          </ResponsiveCard>
        </Grid>
      </RepsonsiveContainerGrid>
  )
}

export default CardWithImage
