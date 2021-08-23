/**
* External dependencies
*/
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
/**
* Internal dependencies
*/
import { JobPreviewCard } from './JobPreview'
import { JobPostForm } from './JobPostForm'
import { useAuth } from '../../../hooks'

export const CreateJobPostFormPage = () => {

  const formType = 'create'

  const initialState = {
    id: '',
    title: '',
    companyName: '',
    jobType: '',
    jobLocation: '',
    sector: '',
    salary: '',
    content: '',
    companyBio: '',
    closeDate: '',
    category:'Job Post',
  }

  const [ formDeets, setFormDeets ] = useState(initialState)

  const { viewer, loadingViewer } = useAuth()

  useEffect(() => {
    if(viewer && !loadingViewer) {
      setFormDeets({...formDeets, companyName: viewer.nickname, companyBio: viewer.description})
    }
  }, [viewer, loadingViewer])

  if( !viewer || loadingViewer ) return <p>loading user details...</p>

console.log(viewer)

  return (

    <Flex
      className="account"
      bg="gray.200"
        // px={{
        //   base: '4',
        //   md: '10',
        // }}
        // py="16"
        // maxW="5xl"
        w="100%"
        direction="column"
        align="center"
        h="fit-content"
        py="10"
    >

      {/* <FileUploadInput /> */}

      <Heading size="lg" as="h1" paddingBottom="4">
        Job Post Form
      </Heading>
    
      <Stack spacing="4" justify="center" align="center" 
        direction={{
          base: 'column',
          md: 'row',
        }}
      >
        <Box 
          alignSelf="flex-start"
          position="sticky"
          top= "4"
        >
          <JobPreviewCard
            title = {formDeets.title}
            companyName = {formDeets.companyName }
            jobType = {formDeets.jobType}
            jobLocation = {formDeets.jobLocation}
            sector = {formDeets.sector}
            salary = {formDeets.salary}
            content = {formDeets.content}
          />
        </Box>
        <Box>
          <JobPostForm 
          formType = { formType }
            formDeets = { formDeets }
            setFormDeets = { setFormDeets } 
            // setIsLoading = { setIsLoading }
            // isLoading = { isLoading }
            id = {formDeets.id}
            title = {formDeets.title}
            companyName = {formDeets.companyName}
            jobType = {formDeets.jobType}
            jobLocation = {formDeets.jobLocation}
            sector = {formDeets.sector}
            salary = {formDeets.salary}
            content = {formDeets.content}
            companyBio = {formDeets.companyBio}
            closeDate = {formDeets.closeDate}
          />
        </Box>
      </Stack>
    </Flex>
  )
}