import React, { useEffect, useState } from 'react'
import { Box } from "@chakra-ui/layout"
import { Flex, Heading } from "@chakra-ui/react"
import { motion } from 'framer-motion';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

// import { JobsFilter } from "../../../components/jobs/jobs-board/jobs-filter";
import { JobsBoardJobList } from "../jobs/jobs-board/jobs-list";
// import Layout from '../../../components/layout/Layout';
import { InnerSidebar } from '../layout/InnerSidebar';
// import { JobsCardContainer } from '../../../components/jobs/JobsCardContainer';
import { Header } from '../layout/Header';
import { Content } from '../layout/Content';
import { JobsFilterTop } from '../jobs/jobs-filter-top';
import { MySpinner } from '../waiting/MySpinner';
import { StaticImage } from 'gatsby-plugin-image';

const MotionBox = motion(Box)

const getTagName = (query) => {
  const fallback = '';

  if (query) {
    const queriedTag = queryString.parse(query);
    const { type, skill } = queriedTag;

    // Ensure a valid expected value is passed
    if (skill || type) {
      //console.log('link query returned', skill, type)
      return {
				skill: skill,
				type: type
			};
    }
    //console.log('parsing didnt work')
    return fallback;
  }
  //console.log('location.search doesnt exsit')
  return fallback;
};

export const ConnectJobs = () => {

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
	}, [tagName.type, tagName.skill])

	if (error) return <p>{`Error: ${error}`}</p>
	if (loading) return <MySpinner />
	// if(!data) return <p>No posts found.</p>

	// console.log(skills, jobTypes, locations)

	const pageType = "jobs-board"

	return (
		<>

			<Flex 
				as="section" 
				h= {{
					md: "300px",
					lg: "400px",
				}} 
				bg="dOrange.300" 
				direction="column" 
				position="relative" 
				justify="center" 
				overflow="hidden"
				px={{ base: '4', md: '12' }}
			>
				<Box 
					w="65%"
					h="95%"
					pos="absolute"
					bottom="0"
					left="12"
					zIndex="10"
					// style={{transform: `translateY(-${offsetY * 0.5}px)`}}
				>
					<StaticImage 
						src="../../images/cutout3.png" 
						alt="young person smiling"
						// height={400}
						fit="cover"
						imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom left"}}
						style={{height:"100%", width:"auto"}}
					/>
				</Box>
				<Box 
					w="65%"
					h="95%"
					pos="absolute"
					bottom="0"
					left="8"
					zIndex="5"
					// style={{transform: `translatex(-${offsetY * 0.05}px)`}}
				>
					<StaticImage 
						src="../../images/cutout3-shadow.png" 
						alt="shadow"
						// height={400}
						fit="cover"
						imgStyle={{height:"100%", objectFit:"contain", objectPosition:"bottom left"}}
						style={{height:"100%", width:"auto"}}
					/>
				</Box>
				<Box 
					w="65%"
					h="100%"
					pos="absolute"
					bottom="0"
					left="0"
					zIndex="1"
					id="pattern"
					// style={{transform: `translateY(${offsetY * .3}px)`}}
				>
        <StaticImage 
          src="../../images/adminBg.svg" 
          alt="shape pattern"
          // height={400}
          fit="cover"
          imgStyle={{height:"100%", objectFit:"cover", objectPosition:"left"}}
          style={{height:"100%", width:"auto"}}
        />
      </Box>

				<Box
					maxW="3xl"
					// mx="auto"
					// px={{ base: '4', lg: '8' }}
					py={{ base: '8', sm: '20' }}
					// textAlign="center"
					zIndex={100}
					position="relative"
					alignSelf="flex-end"
				>
					<Heading 
						as="h1" 
						color="gray.50" 
						fontSize={{base: '50px', sm: '65px', md: '120px'}} 
						letterSpacing="tight" 
						textTransform="uppercase"
						maxW="2xl"
						lineHeight="1"
					>
						<Box as="mark" bg="transparent" color="inherit" fontWeight="300">Connect </Box> 
						<Box as="mark" bg="transparent" color="inherit" fontWeight="600">Platfrom </Box> 
						<Box as="mark" bg="transparent" color="inherit" fontWeight="900">Opporunity </Box> 
						<Box as="mark" bg="transparent" color="inherit" fontWeight="100">Board </Box>
					</Heading>
				</Box>
			</Flex>
      
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
