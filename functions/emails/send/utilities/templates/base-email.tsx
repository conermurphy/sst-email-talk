import { ReactNode } from 'react'
import { Tailwind } from '@react-email/tailwind'
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components'

type Props = {
  children: ReactNode
  preview: string
}

export function BaseEmail({ children, preview }: Props) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white text-gray-800">
          <Preview>{preview}</Preview>
          <Container className="mx-auto my-0 bg-neutral-200 p-5">
            <Section className="bg-white">
              <Section className="px-9 py-6">{children}</Section>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
