// `.env.ts` is generated by the `npm run env` command
import env from './.env';

export const environment = {
  production: true,
  version: env.npm_package_version,
  serverUrl: 'http://dealerone.processmyquote.com',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ],
  aq3Url: 'https://aq3.processmyquote.com/DemoAgent',
  biweeklyTransactionFee: 0.95,
  dealerCode: 'ewaldkia',
  dealerLogo: 'ewald-logo.svg',
  tagline: `The Ewald Kia Car Loan Calculator lets you shop vehicles
  and a protection package that matches your ideal weekly budget.`,
};
