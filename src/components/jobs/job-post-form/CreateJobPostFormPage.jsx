/**
 * External dependencies
 */
import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
/**
 * Internal dependencies
 */
// import { JobPreviewCard } from './JobPreview'
import { JobPostForm } from './JobPostForm';
import { useAuth } from '../../../hooks';
import { Header } from '../../layout/Header';
import { Content } from '../../layout/Content';
import { InnerSidebar } from '../../layout/InnerSidebar';
// import { useFileUpload } from '../../../hooks/use-file-upload'
// import { MySpinner } from '../../waiting/MySpinner'

export const CreateJobPostFormPage = () => {
  // console.log('create form')

  const formType = 'create';

  const [formDeets, setFormDeets] = useState({
    skills: [],
    jobApplicationQuestions: [],
  });
  // const [salStructure, setSalStructure] = useState('Month')

  const { viewer, loadingViewer } = useAuth();

  const pagetype = 'job-form';

  useEffect(() => {
    if (viewer && !loadingViewer) {
      setFormDeets({
        ...formDeets,
        companyName: viewer.nickname,
        companyBio: viewer.description,
        category: 'Job Post',
      });
    }
  }, [viewer, loadingViewer]);

  // const { FileUploadInput } = useFileUpload()

  return (
    <>
      <Header title="Post an Opportunity" pagetype={pagetype} />
      {/* <FileUploadInput /> */}
      <Flex w="100%">
        <InnerSidebar pagetype={pagetype} formDeets={formDeets} />
        <Content py="12">
          <JobPostForm
            formType={formType}
            formDeets={formDeets}
            setFormDeets={setFormDeets}
          />
        </Content>
      </Flex>
    </>
  );
};
