import { Box, HStack, Text, useCheckbox, useColorModeValue as mode, useId } from '@chakra-ui/react'
import * as React from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { CheckboxBox } from './CheckboxBox'

export const ButtonCheckbox = (props) => {
  const { question, ...rest } = props
  const { getCheckboxProps, getInputProps, getLabelProps, state } = useCheckbox(rest)
  const id = useId()
  return (
    <label {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <CheckboxBox {...getCheckboxProps()} id={id}>
        <HStack spacing="4">
          <Box
            data-checked={state.isChecked ? '' : undefined}
            fontSize="2xl"
            _checked={{
              color: mode('blue.500', 'blue.300'),
            }}
            color={mode('gray.300', 'whiteAlpha.400')}
          >
            {state.isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </Box>
          <Box flex="1">
            <Text fontWeight="bold">{question.name}</Text>
            {/* <Text fontSize="sm">{description}</Text> */}
          </Box>
        </HStack>
      </CheckboxBox>
    </label>
  )
}