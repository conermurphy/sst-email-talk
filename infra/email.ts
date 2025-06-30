// NOTE: Required because you can only send emails to verified email addresses
// when in SES sandbox mode
new sst.aws.Email('Email', {
  sender: 'example@example.com',
})

export const sesIdentity = new sst.aws.Email('DomainIdentity', {
  sender: 'example.com',
  dns: sst.cloudflare.dns(),
})

export const emailBus = new sst.aws.Bus('EmailBus')

emailBus.subscribe(
  'EmailBusHandler',
  {
    handler: 'functions/emails/send/index.handler',
    link: [sesIdentity],
  },
  {
    pattern: { source: ['app'], detailType: ['send-email'] },
  }
)

export const createEventLambda = new sst.aws.Function('CreateEventHandler', {
  handler: 'functions/create-event.handler',
  url: true,
  link: [emailBus],
})
