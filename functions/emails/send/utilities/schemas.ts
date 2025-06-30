import { z } from 'zod'

export const verifyEmailSchema = z.object({
  type: z.literal('VERIFY_EMAIL'),
  url: z.string().url(),
})

export const resetPasswordSchema = z.object({
  type: z.literal('RESET_PASSWORD'),
  url: z.string().url(),
})

export const emailRecordSchema = z.object({
  userId: z.string(),
  data: z.discriminatedUnion('type', [verifyEmailSchema, resetPasswordSchema]),
})
