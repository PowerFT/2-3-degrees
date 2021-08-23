import React, { useState, useRef } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, Text } from '@chakra-ui/react'
import { FiFile } from 'react-icons/fi'
import { useFileUploadMutation } from './mutations/use-file-upload-mutation'


export const useFileUpload = () => {
  // const inputRef = useRef(null)

	const { fileUploadMutation } = useFileUploadMutation()

	const [status, setStatus] = useState()
	const [error, setError] = useState()
	// const [selectedFile, setSelectedFile] = useState()
	const selectedFile = useRef()

  // const handleClick = () => inputRef.current?.click()

	const FileUploadInput = (multiple, hidden, accept) => {

		const handleClick = () => {
			return fileUploadMutation( selectedFile.current )

			.then( (res) => {
				console.log(res)
				setStatus( 'resolved' );
				// navigate('/maker/jobs')
			} )
			.catch( ( errors ) => {
				console.log(errors)
				setError(errors);
				setStatus( 'resolved' );
			} );
		}

		const onFileSelectSuccess = (file) => {
			selectedFile.current = file
			console.log(selectedFile.current)
		}
	
		const handleInputValidation = (e) => {
			setError( null );
			setStatus( 'resolving' );
			// handle validations
			const file = e.target.files[0];
			const fileLimit = 1024*500
			
			if (file.size > fileLimit)
				setError(`File size cannot exceed more than ${fileLimit}`);
	
			else onFileSelectSuccess(file);
		};
	
		return (
			<InputGroup>
				<Input
					type='file'
					multiple={multiple || false}
					// hidden
					accept={accept}
					// {...rest}
					// ref={(e) => {
					//   ref(e)
					//   inputRef.current = e
					// }}
					onChange={handleInputValidation}
				/>
				<Button onClick={handleClick}>
					Upload
				</Button>
			</InputGroup>
		)
	}

	return {
		FileUploadInput
	}
}

// const App = () => {

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <FormControl isInvalid={!!errors.file_} isRequired>
//           <FormLabel>File input</FormLabel>

//           <FileUpload
//             accept={'image/*'}
//             multiple
//           >
//             <Button leftIcon={<Icon as={FiFile} />}>
//               Upload
//             </Button>
//           </FileUpload>

//           <FormErrorMessage>
//             {errors.file_ && errors?.file_.message}
//           </FormErrorMessage>
//         </FormControl>

//         <Button>Submit</Button>
//       </form>
//     </>
//   )
// }