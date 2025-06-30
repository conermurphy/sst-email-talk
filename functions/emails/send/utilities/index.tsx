import { z } from 'zod'
import { render } from '@react-email/render'
import { emailRecordSchema } from './schemas'
import { Welcome, Second } from './templates'
import { emailSchema } from '..'

type Return =
  | {
      success: false
      error: string
      type: z.infer<typeof emailRecordSchema>['data']['type']
    }
  | { success: true; subject: string; body: { html: string; text: string } }

export async function generateEmail(
  type: z.infer<typeof emailSchema>['type']
): Promise<Return> {
  switch (type) {
    case 'WELCOME': {
      const html = await render(<Welcome />)

      return {
        success: true,
        subject: 'Welcome',
        body: {
          html,
          text: `Welcome to my email`,
        },
      }
    }

    case 'SECOND': {
      const html = await render(<Second />)

      return {
        success: true,
        subject: 'Second',
        body: {
          html,
          text: `Welcome to my second email`,
        },
      }
    }
  }
}
