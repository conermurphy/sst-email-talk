import { Heading, Text } from '@react-email/components'
import { BaseEmail } from './base-email'

export function Second() {
  const textStyles = 'mx-0 my-6 font-sans text-sm text-gray-950'

  return (
    <BaseEmail preview="Second">
      <Heading className={`${textStyles} mb-4 text-xl font-bold`}>
        Second
      </Heading>
      <Text className={textStyles}>Welcome to my second email!</Text>
    </BaseEmail>
  )
}
