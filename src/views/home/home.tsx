import React, { Fragment, useEffect } from 'react'
import FeatureSection from './feature-section/feature-section';
import HeadSection from './head-section/head-section';
import PricingSection from './pricing-section/pricing-section';

const Home = (props: any) => {
  const { selectHome } = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);

  return (

    <Fragment>
      <HeadSection />
      <FeatureSection />
      <PricingSection />
    </Fragment>


  )
}

export default Home
