import React, { useState, useRef } from 'react';
import { Button, Input, InputGroup } from '@chakra-ui/react';
import { useFileUploadMutation } from './mutations/use-file-upload-mutation';

export const useFileUpload = () => {
  const { fileUploadMutation } = useFileUploadMutation();

  const [status, setStatus] = useState();
  const [error, setError] = useState();
  const selectedFile = useRef();

  const FileUploadInput = (multiple, hidden, accept) => {
    const handleClick = () => {
      return fileUploadMutation(selectedFile.current)
        .then((res) => {
          setStatus('resolved');
        })
        .catch((errors) => {
          setError(errors);
          setStatus('resolved');
        });
    };

    const onFileSelectSuccess = (file) => {
      selectedFile.current = file;
    };

    const handleInputValidation = (e) => {
      setError(null);
      setStatus('resolving');
      // handle validations
      const file = e.target.files[0];
      const fileLimit = 1024 * 500;

      if (file.size > fileLimit) {
        setError(`File size cannot exceed more than ${fileLimit}`);
      } else onFileSelectSuccess(file);
    };

    return (
      <InputGroup>
        <Input
          type="file"
          multiple={multiple || false}
          accept={accept}
          onChange={handleInputValidation}
        />
        <Button onClick={handleClick}>Upload</Button>
      </InputGroup>
    );
  };

  return {
    FileUploadInput,
  };
};
