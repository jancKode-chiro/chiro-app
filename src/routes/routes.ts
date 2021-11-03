import { lazy } from 'react';
import {
  DASHBOARD_PATH,
  CARD_PATH,
  SMS_PATH,
  WALLET_PATH,
  ACTIVATE_ACCOUNT_PATH,
} from '../constants/paths';

export const ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: lazy(() => import('../views/dashboard/dashboard')),
    exact: true,
  },
  {
    path: CARD_PATH,
    component: lazy(() => import('../views/card/card')),
    exact: true,
  },
  {
    path: WALLET_PATH,
    component: lazy(() => import('../views/wallet/wallet')),
    exact: true,
  },
  {
    path: SMS_PATH,
    component: lazy(() => import('../views/bulk/bulk')),
    exact: true,
  },
  {
    path: ACTIVATE_ACCOUNT_PATH,
    component: lazy(
      () => import('../views/activation-code-page/activation-code-page')
    ),
    exact: true,
  },
];
