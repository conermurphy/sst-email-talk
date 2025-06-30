import {
  SESv2Client,
  SendEmailCommand,
  SendEmailCommandInput,
} from '@aws-sdk/client-sesv2'
import { EventBridgeEvent } from 'aws-lambda'
import { Resource } from 'sst'
import { generateEmail } from './utilities'
import { z } from 'zod'

const client = new SESv2Client()

export const emailSchema = z.object({
  email: z.string(),
  type: z.enum(['WELCOME', 'SECOND']),
})

export const handler = async (
  event: EventBridgeEvent<'send-email', z.infer<typeof emailSchema>>
) => {
  const fromEmail = `noreply@${Resource.DomainIdentity.sender}`

  const result = emailSchema.safeParse(event.detail)
  if (!result.success) {
    console.log(result.error.flatten)
    return
  }

  const { email, type } = result.data

  try {
    const emailContent = await generateEmail(type)

    if (!emailContent.success) {
      console.log('Email failed to generate')
      return
    }

    const params: SendEmailCommandInput = {
      FromEmailAddress: fromEmail,
      Destination: {
        ToAddresses: [email],
      },
      Content: {
        Simple: {
          Subject: { Data: emailContent.subject },
          Body: {
            Html: { Data: emailContent.body.html },
            Text: { Data: emailContent.body.text },
          },
        },
      },
    }

    await client.send(new SendEmailCommand(params))
  } catch (e) {
    console.log('Failed to send email', e)
  }
}
