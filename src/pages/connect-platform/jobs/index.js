import React, { useEffect, useState } from 'react'
import { Box } from "@chakra-ui/layout"
import { Flex } from "@chakra-ui/react"
import { motion } from 'framer-motion';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

// import { JobsFilter } from "../../../components/jobs/jobs-board/jobs-filter";
import { JobsBoardJobList } from "../../../components/jobs/jobs-board/jobs-list";
// import Layout from '../../../components/layout/Layout';
import { InnerSidebar } from '../../../components/layout/InnerSidebar';
// import { JobsCardContainer } from '../../../components/jobs/JobsCardContainer';
import { Header } from '../../../components/layout/Header';
import { Content } from '../../../components/layout/Content';
import { JobsFilterTop } from '../../../components/jobs/jobs-filter-top';
import { MySpinner } from '../../../components/waiting/MySpinner';

const MotionBox = motion(Box)

const getTagName = (query) => {
  const fallback = '';

  if (query) {
    const queriedTag = queryString.parse(query);
    const { type, skill } = queriedTag;

    // Ensure a valid expected value is passed
    if (skill || type) {
      console.log('link query returned', skill, type)
      return {
				skill: skill,
				type: type
			};
    }
    console.log('parsing didnt work')
    return fallback;
  }
  console.log('location.search doesnt exsit')
  return fallback;
};

const ConnectJobs = () => {

	// url query
	const location = useLocation();
	const tagName = location.search ? getTagName(location.search) : '';
	// console.log(tagName.type)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const [locations, setLocations] = useState([])
	const [sectors, setSectors] = useState([])
	const [jobTypes, setJobTypes] = useState([])
	const [skills, setSkills] = useState([])

	useEffect(() => {
		if(tagName.type) setJobTypes([tagName.type])
		if(tagName.skill) {
			setSkills([tagName.skill])
		}
	}, [])

	if (error) return <p>{`Error: ${error}`}</p>
	if (loading) return <MySpinner />
	// if(!data) return <p>No posts found.</p>

	// console.log(skills, jobTypes, locations)

	const pageType = "jobs-board"

	return (
		<>

			<Header
        title="Connect Platform Opportunity Board"
        subTitle="Connect Platform Opportunity Board"
        pageType={pageType}
      />
      
      <Flex w="100%">
        <InnerSidebar
          pageType={pageType}
					locations={locations}
					setLocations={setLocations}
					sectors={sectors}
					setSectors={setSectors}
					jobTypes={jobTypes}
					setJobTypes={setJobTypes}
					skills={skills}
					setSkills={setSkills}
        />
        <Content
          pageType={pageType}
					
        >
					<Flex
						position="sticky"
						top="3"
						width="100%"
						p="3"
						justify="center"
						zIndex="10"
						display={{
							base: 'flex',
							sm: "flex",
							lg: 'none',
						}}
					>
						<JobsFilterTop 
							locations={locations}
							setLocations={setLocations}
							sectors={sectors}
							setSectors={setSectors}
							jobTypes={jobTypes}
							setJobTypes={setJobTypes}
							skills={skills}
							setSkills={setSkills}
						/>
					</Flex>
					<MotionBox
						key="jobList"
						initial={{ opacity: 0, x: 400 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 400 }}
						transition={{
							type: "spring",
							mass: 0.15,
							stiffness: 115,
							duration: 1
						}}
						h="fit-content"
					>
						<JobsBoardJobList locations={locations} sectors={sectors} jobTypes={jobTypes} skills={skills}/>
					</MotionBox>
				</Content>
			</Flex>

		</>
	)
}

export default ConnectJobs
