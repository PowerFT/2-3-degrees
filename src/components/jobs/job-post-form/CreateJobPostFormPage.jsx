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
import { MySpinner } from '../../waiting/MySpinner'

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
    applicationLink: '',
    category:'Job Post',
  }

  const [ formDeets, setFormDeets ] = useState(initialState)
  const [salStructure, setSalStructure] = useState('Year')

  const { viewer, loadingViewer } = useAuth()

  const pageType = "job-form"

  useEffect(() => {
    if(viewer && !loadingViewer) {
      setFormDeets({...formDeets, companyName: viewer.nickname, companyBio: viewer.description})
    }
  }, [viewer, loadingViewer])

  // if( !viewer || loadingViewer ) return <MySpinner />

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
          formTitle = {formDeets.title}
          formCompanyName = {formDeets.companyName}
          formJobLocation = {formDeets.jobLocation}
          formSalStructure = {salStructure}
          formSector = {formDeets.sector}
          formJobType = {formDeets.jobType}
          formSalary = {formDeets.salary}
        />
        <Content py="12">
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
          />
        </Content>
      </Flex>
    </>
  )
}