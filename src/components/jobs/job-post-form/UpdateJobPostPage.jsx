/**
 * External dependencies
 */
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { useQuery, gql } from '@apollo/client';
/**
 * Internal dependencies
 */
import { JobPostForm } from './JobPostForm';
import { MySpinner } from '../../waiting/MySpinner';
import { MyError } from '../../waiting/MyError';
import { InnerSidebar } from '../../layout/InnerSidebar';
import { Header } from '../../layout/Header';
import { Content } from '../../layout/Content';

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
      jobApplicationQuestions {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// const test = [
//   {
//     __typename: 'JobApplicationQuestion',
//     name: 'Tell us about one of your key skills and how it is relevant to this opportunity?',
//     id: 'dGVybTo1NzI=',
//     slug: 'question-2',
//   },
//   {
//     __typename: 'JobApplicationQuestion',
//     name: 'Tell us how this opportunity will contribute to your future plans?',
//     id: 'dGVybTo1Njk=',
//     slug: 'question-3',
//   },
//   {
//     __typename: 'JobApplicationQuestion',
//     name: 'What experience do you have that is relevant to this opportunity?',
//     id: 'dGVybTo2NDM=',
//     slug: 'question-4',
//   },
// ];

export const UpdateJobPostFormPage = () => {
  // url query
  const location = useLocation();
  const jobToEditId = location.search ? getJobPostId(location.search) : '';
  const formType = jobToEditId ? 'update' : 'create';

  //console.log(jobToEditId)

  const initialState = {
    id: '',
    title: '',
    companyName: '',
    jobType: '',
    jobLocation: '',
    sector: '',
    salary: '',
    salaryStructures: '',
    content: '',
    companyBio: '',
    closeDate: '',
    skills: [],
    jobApplicationQuestions: [],
    category: 'Job Post',
  };

  const [formDeets, setFormDeets] = useState(initialState);
  // const [salStructure, setSalStructure] = useState('Year')

  const { loading, error, data } = useQuery(GET_JOB_POST_BY_ID, {
    variables: { id: jobToEditId },
  });

  useEffect(() => {
    if (!loading && data) {
      // console.log('use effect fired', data);
      const jobPost = data.jobPost;
      const questions = jobPost?.jobApplicationQuestions?.nodes.map((node) => {
        return { name: node.name, slug: node.slug };
      });
      const skills = jobPost?.skills?.nodes.map((node) => {
        return { name: node.name };
      });
      setFormDeets({
        id: jobPost?.id,
        title: jobPost?.title,
        companyName: jobPost?.companyName?.nodes[0]?.name,
        jobType: jobPost?.jobType?.nodes[0]?.name,
        jobLocation: jobPost?.jobLocation?.nodes[0]?.name,
        sector: jobPost?.sector?.nodes[0]?.name,
        salary: jobPost?.salary,
        salaryStructures: jobPost?.salaryStructures?.nodes[0]?.name,
        content: jobPost?.content,
        companyBio: jobPost?.companyBio,
        closeDate: jobPost?.closeDate,
        skills: skills,
        jobApplicationQuestions: questions,
        category: 'Job Post',
      });
    }
  }, [loading, data]);

  const pagetype = 'job-form';

  // if(jobToEditId) {
  if (error) {
    // console.log(error);
    return <MyError error={error} />;
  }
  if (loading) return <MySpinner />;
  if (!data) return <MyError error="Opportunity not found" />;
  // }

  return (
    <>
      <Header title="Update an Opportunity" pagetype={pagetype} />
      {/* <FileUploadInput /> */}
      <Flex w="100%">
        <InnerSidebar pagetype={pagetype} formDeets={formDeets} />
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
  );
};
