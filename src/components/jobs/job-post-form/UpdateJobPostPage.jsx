/**
* External dependencies
*/
// import { ViewIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { useQuery, gql } from '@apollo/client'
/**
* Internal dependencies
*/
// import { useAuth } from '../../../hooks'
// import { JobPreviewCard } from './JobPreview'
import { JobPostForm } from './JobPostForm'
import { MySpinner } from '../../waiting/MySpinner'
import { MyError } from '../../waiting/MyError'
import { InnerSidebar } from '../../layout/InnerSidebar';
import { Header } from '../../layout/Header';
import { Content } from '../../layout/Content';
// import { useSubmitJobPost } from '../../../hooks'

// import { useJobPostByIdQuery } from '../../../hooks/queries/use-job-post-by-id-query'

const getJobPostId = (query) => {
  const fallback = '';

  if (query) {
    const queriedJob = queryString.parse(query);
    const { job } = queriedJob;

    // Ensure a valid expected value is passed
    if (job) {
      //console.log('link query returned')
      return job;
    }
    //console.log('parsing didnt work')
    return fallback;
  }
  //console.log('location.search doesnt exsit')
  return fallback;
};

const GET_JOB_POST_BY_ID = gql`
	query JobPostById($id: ID!) {
		jobPost(id: $id) {
			closeDate
			companyBio
      applicationLink
			content(format: RAW)
			salary
			title
			id
			sector {
				nodes {
					name
				}
			}
      salaryStructures {
				nodes {
					name
				}
			}
			jobType {
				nodes {
					name
				}
			}
			companyName {
				nodes {
					name
				}
			}
			jobLocation {
				nodes {
					name
				}
			}
      skills {
        nodes {
          name
        }
      }
		}
	}
`
export const UpdateJobPostFormPage = () => {

  // url query
  const location = useLocation();
  const jobToEditId = location.search ? getJobPostId(location.search) : '';
  const formType = jobToEditId ? 'update' : 'create'

  //console.log(jobToEditId)

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
    category: 'Job Post',
  }

  const [formDeets, setFormDeets] = useState(initialState)
  // const [salStructure, setSalStructure] = useState('Year')

  const { loading, error, data } = useQuery(GET_JOB_POST_BY_ID, { variables: { id: jobToEditId } })

  useEffect(() => {
    if (!loading && data) {
      console.log('use effect fired', data)
      const jobPost = data.jobPost
      setFormDeets({
        id: jobPost?.id,
        title: jobPost?.title,
        companyName: jobPost?.companyName?.nodes[0]?.name,
        jobType: jobPost?.jobType?.nodes[0]?.name,
        jobLocation: jobPost?.jobLocation?.nodes[0]?.name,
        sector: jobPost?.sector?.nodes[0]?.name,
        salary: jobPost?.salary,
        salaryStructure: jobPost?.salaryStructures?.nodes[0]?.name,
        content: jobPost?.content,
        companyBio: jobPost?.companyBio,
        closeDate: jobPost?.closeDate,
        applicationLink: jobPost?.applicationLink,
        skills: jobPost?.skills.nodes,
        category: 'Job Post',
      })
    }
  }, [loading, data])

  const pageType = "job-form"

  // if(jobToEditId) {
  if (error) return <MyError error={error} />
  if (loading) return <MySpinner />
  if (!data) return <MyError error="Opportunity not found" />
  // }

  return (

    <>
      <Header
        title="Update an Opportunity"
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
            formDeets={formDeets}
            setFormDeets={setFormDeets}
            formType={formType}
            id={formDeets.id}
          />
        </Content>
      </Flex>
    </>
  )
}