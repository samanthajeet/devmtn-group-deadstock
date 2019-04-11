import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import AppAppBar from './modules/views/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductCategories />
      <ProductHowItWorks />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);