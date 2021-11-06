import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import { Flex, Heading } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

// import { JobsFilter } from "../../../components/jobs/jobs-board/jobs-filter";
import { JobsBoardJobList } from '../jobs/jobs-board/jobs-list';
// import Layout from '../../../components/layout/Layout';
import { InnerSidebar } from '../layout/InnerSidebar';
// import { JobsCardContainer } from '../../../components/jobs/JobsCardContainer';
// import { Header } from '../layout/Header';
import { Content } from '../layout/Content';
import { JobsFilterTop } from '../jobs/jobs-filter-top';
import { MySpinner } from '../waiting/MySpinner';
import { StaticImage } from 'gatsby-plugin-image';

// const MotionBox = motion(Box)

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
        type: type,
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [locations, setLocations] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (tagName.type) setJobTypes([tagName.type]);
    if (tagName.skill) {
      setSkills([tagName.skill]);
    }
  }, [tagName.type, tagName.skill]);

  if (error) return <p>{`Error: ${error}`}</p>;
  if (loading) return <MySpinner />;
  // if(!data) return <p>No posts found.</p>

  // console.log(skills, jobTypes, locations)

  const pagetype = 'jobs-board';

  return (
    <>
      <Flex
        h={{
          base: '300px',
          md: '400px',
          lg: '500px',
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
          left="4"
          zIndex="10"
          display={{ base: 'none', md: 'block' }}

          // style={{transform: `translateY(-${offsetY * 0.5}px)`}}
        >
          <StaticImage
            src="../../images/cutout3.png"
            alt="young person smiling"
            // height={400}
            fit="cover"
            imgStyle={{
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom left',
            }}
            style={{ height: '100%', width: 'auto' }}
          />
        </Box>
        <Box
          w="65%"
          h="95%"
          pos="absolute"
          bottom="0"
          left="1"
          zIndex="5"
          display={{ base: 'none', md: 'block' }}

          // style={{transform: `translatex(-${offsetY * 0.05}px)`}}
        >
          <StaticImage
            src="../../images/cutout3-shadow.png"
            alt="shadow"
            // height={400}
            fit="cover"
            imgStyle={{
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'left',
            }}
            style={{ height: '100%', width: 'auto' }}
          />
        </Box>
        <Box
          w="auto"
          h="90%"
          pos="absolute"
          left="2%"
          zIndex="1"
          id="pattern"
          top="50%"
          style={{ transform: `translateY(-50%)` }}
        >
          <StaticImage
            src="../../images/adminBg.svg"
            alt="shape pattern"
            // height={400}
            fit="cover"
            imgStyle={{
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'left',
            }}
            style={{ height: '100%', width: 'auto' }}
          />
        </Box>

        <Box
          // mx="auto"
          // px={{ base: '4', lg: '8' }}
          py={{ base: '8', sm: '12', lg: '16' }}
          // textAlign="center"
          zIndex={11}
          position="relative"
          alignSelf="flex-end"
          maxW={{ base: '300px', sm: 'sm', md: 'md', lg: '2xl' }}
        >
          <Heading
            as="h1"
            color="gray.50"
            fontSize={{ base: '50px', sm: '75px', md: '90px', lg: '120px' }}
            letterSpacing="tight"
            textTransform="uppercase"
            lineHeight="1"
            textAlign="end"
          >
            <Box as="mark" bg="transparent" color="inherit" fontWeight="300">
              Connect{' '}
            </Box>
            <Box as="mark" bg="transparent" color="inherit" fontWeight="600">
              Platform{' '}
            </Box>
            <Box as="mark" bg="transparent" color="inherit" fontWeight="900">
              Opporunity{' '}
            </Box>
            <Box as="mark" bg="transparent" color="inherit" fontWeight="100">
              Board{' '}
            </Box>
          </Heading>
        </Box>
      </Flex>

      <Flex w="100%">
        <InnerSidebar
          pagetype={pagetype}
          locations={locations}
          setLocations={setLocations}
          sectors={sectors}
          setSectors={setSectors}
          jobTypes={jobTypes}
          setJobTypes={setJobTypes}
          skills={skills}
          setSkills={setSkills}
        />
        <Content pagetype={pagetype}>
          <Flex
            position="sticky"
            top="3"
            width="100%"
            p="3"
            py="6"
            justify="center"
            zIndex="10"
            display={{
              base: 'flex',
              sm: 'flex',
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
          <Box h="fit-content" minH="90vh">
            <JobsBoardJobList
              locations={locations}
              sectors={sectors}
              jobTypes={jobTypes}
              skills={skills}
            />
          </Box>
        </Content>
      </Flex>
    </>
  );
};
