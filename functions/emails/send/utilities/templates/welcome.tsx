import { Heading, Text } from '@react-email/components'
import { BaseEmail } from './base-email'

export function Welcome() {
  const textStyles = 'mx-0 my-6 font-sans text-sm text-gray-950'

  return (
    <BaseEmail preview="Welcome">
      <Heading className={`${textStyles} mb-4 text-xl font-bold`}>
        Welcome
      </Heading>
      <Text className={textStyles}>Welcome to my email!</Text>
    </BaseEmail>
  )
}
