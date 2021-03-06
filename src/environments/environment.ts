// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// `.env.ts` is generated by the `npm run env` command
import env from './.env';

export const environment = {
  production: false,
  version: env.npm_package_version + '-dev',
  serverUrl: 'https://dealerone.processmyquote.com',
  defaultLanguage: 'English',
  supportedLanguages: [
    'English',
    'Español'
  ],
  aq3Url: 'https://aq3.processmyquote.com/DemoAgent',
  transactionFee: 0.98,
  dealerCode: 'coast2coast',
  dealerLogo: 'coast-to-coast-logo_d.png',
  lenderLogo: 'Ally.png',
  sellingTitle: 'Sell',
  sellingUrl: '', // 'https://maxallowance.com/trade1',
  sellingDesc: `
            <p>We've partnered with MaxAllowance.com to help you sell your vehicle online.<p>
            <p>They provide a comprehensive service to help you get the maximum
            price possible for your vehicle, whether you are trading it
            in for a new vehicle or just selling it outright.</p>`,
  tagline: `Our Loan Calculator lets you shop for vehicles
            and a protection package that match your ideal monthly budget.`,
  // use the line below and ssh -L 44349:localhost:44349 bm3.local to debug server side code.
  // aq3Url: 'https://localhost:44349/DemoAgent'
};
