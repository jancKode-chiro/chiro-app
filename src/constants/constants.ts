export const STRIPE_KEY: string | undefined =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_STRIPE_TEST_KEY
    : process.env.REACT_APP_STRIPE_LIVE_KEY;
