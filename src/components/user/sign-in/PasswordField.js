import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export const PasswordField = React.forwardRef((props, ref) => {

	const {password, setPassword, status} = props
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef(null)
  const mergeRef = useMergeRefs(inputRef, ref)

  const onClickReveal = () => {
    onToggle()
    const input = inputRef.current

    if (input) {
      input.focus({
        preventScroll: true,
      })
      const length = input.value.length * 2
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length)
      })
    }
  }

  return (
    <FormControl id="password">
      {/* <Flex justify="space-between">
        <FormLabel>Password</FormLabel>
        <Box as="a" color={mode('blue.600', 'blue.200')} fontWeight="semibold" fontSize="sm">
          Forgot Password?
        </Box>
      </Flex> */}
      <InputGroup>
        <InputRightElement h="100%">
          <IconButton
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          ref={mergeRef}
          name="password"
					placeholder="Password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
					value={password} 
					onChange={e=> setPassword(e.target.value)}
					disabled={ status === 'resolving' }
					fontSize="md"
          roundedTop="0"
					size="lg"
          {...props}
        />
      </InputGroup>
    </FormControl>
  )
})
PasswordField.displayName = 'PasswordField'