/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: 'sst-email-talk',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: 'conermurphy',
          region: 'eu-west-2',
        },
        cloudflare: '6.3.0',
      },
    }
  },
  async run() {
    await import('./infra/email')
  },
})
