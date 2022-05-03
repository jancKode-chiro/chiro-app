import { lazy } from 'react';
import { ACTIVATE_ACCOUNT_PATH } from '../constants/paths';

export const ROUTES = [
  {
    path: ACTIVATE_ACCOUNT_PATH,
    component: lazy(
      () => import('../views/activation-code-page/activation-code-page')
    ),
    exact: true,
  },
];
