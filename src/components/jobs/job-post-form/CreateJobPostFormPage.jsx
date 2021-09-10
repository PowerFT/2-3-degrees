/**
* External dependencies
*/
import { Box, Flex, Heading, Spinner, Stack } from '@chakra-ui/react'
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
    salaryStructure: '',
    content: '',
    companyBio: '',
    closeDate: '',
    category:'Job Post',
  }

  const [ formDeets, setFormDeets ] = useState(initialState)
  const [salStructure, setSalStructure] = useState('Year')

  const { viewer, loadingViewer } = useAuth()

  useEffect(() => {
    if(viewer && !loadingViewer) {
      setFormDeets({...formDeets, companyName: viewer.nickname, companyBio: viewer.description})
    }
  }, [viewer, loadingViewer, formDeets])

  if( !viewer || loadingViewer ) return <Spinner />

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
            salStructure={salStructure}
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
            salaryStructure = {formDeets.salaryStructure}
            salStructure={salStructure}
            setSalStructure={setSalStructure}
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