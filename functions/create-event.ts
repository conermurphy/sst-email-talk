import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge'
import { LambdaFunctionURLEvent } from 'aws-lambda'
import { Resource } from 'sst'
import { emailSchema } from './emails/send'

const client = new EventBridgeClient()

export const handler = async (event: LambdaFunctionURLEvent) => {
  if (event.requestContext.http.method !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        Allow: 'POST',
      },
      body: JSON.stringify({
        message: 'Method not allowed',
        allowedMethods: ['POST'],
      }),
    }
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Body cannot be empty',
      }),
    }
  }

  const body = emailSchema.parse(JSON.parse(event.body))

  await client.send(
    new PutEventsCommand({
      Entries: [
        {
          Source: 'app',
          DetailType: 'send-email',
          EventBusName: Resource.EmailBus.name,
          Detail: JSON.stringify(body),
        },
      ],
    })
  )

  return { statusCode: 200 }
}
