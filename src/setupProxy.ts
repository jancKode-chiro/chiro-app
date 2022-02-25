import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: any) => {
  app.use(createProxyMiddleware('/sms-notification'), {
    target: 'https://lead-flo-sms-service-2056.twil.io',
    changeOrigin: true,
  });
};
