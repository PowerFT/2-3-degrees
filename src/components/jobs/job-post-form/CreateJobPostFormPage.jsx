/**
* External dependencies
*/
import {  Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
/**
* Internal dependencies
*/
// import { JobPreviewCard } from './JobPreview'
import { JobPostForm } from './JobPostForm'
import { useAuth } from '../../../hooks'
import { Header } from '../../layout/Header'
import { Content } from '../../layout/Content'
import { InnerSidebar } from '../../layout/InnerSidebar'
// import { MySpinner } from '../../waiting/MySpinner'

export const CreateJobPostFormPage = () => {

  const formType = 'create'

  const [ formDeets, setFormDeets ] = useState({skills: []})
  const [salStructure, setSalStructure] = useState('Year')

  const { viewer, loadingViewer } = useAuth()

  const pageType = "job-form"

  useEffect(() => {
    if(viewer && !loadingViewer) {
      setFormDeets({...formDeets, companyName: viewer.nickname, companyBio: viewer.description, category: "Job Post"})
    }
  }, [viewer, loadingViewer])

  return (
    <>
      <Header
        title="Post an Opportunity"
        pageType={pageType}
      />
      {/* <FileUploadInput /> */}
      <Flex w="100%">
        <InnerSidebar
          pageType={pageType}
          formDeets = { formDeets }
        />
        <Content py="12">
          <JobPostForm 
            formType = { formType }
            formDeets = { formDeets }
            setFormDeets = { setFormDeets }
          />
        </Content>
      </Flex>
    </>
  )
}