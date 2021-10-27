import React from 'react';
import { withRouter } from 'react-router';
import { CustomCard, Row } from './box';
import CardWithImage from '../wrapper/card-with-image';

const CustomBox = () => {
  return (
    <div>
      <Row>
        <CustomCard xs='12' sm='6' md='8'>
          md: 8 - sm: 6 - xs: 12
        </CustomCard>
        <CustomCard xs='6' md='4'>
          md: 4 - xs: 6
        </CustomCard>
      </Row>
    </div>
  );
};

export default withRouter(CustomBox);
