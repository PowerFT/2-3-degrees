import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'gatsby';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { BsFillLightningFill } from 'react-icons/bs';

import { JobsFilter } from '../jobs/jobs-board/jobs-filter';
import { JobSidebar } from '../jobs/job-post/jobPostSidebar';
import { JobPreviewCard } from '../jobs/job-post-form/JobPreview';

export const InnerSidebar = ({
  primaryLinks,
  pagetype,
  locations,
  setLocations,
  sectors,
  setSectors,
  jobTypes,
  setJobTypes,
  skills,
  setSkills,
  jobLocation,
  sector,
  jobType,
  jobSkills,
  salary,
  formDeets,
  closeDate,
  companyBio,
  companyName,
  salaryStructures,
  jobId,
  jobDatabaseId,
  handleClick,
  toBeLiked,
  thisJobAppliedFor,
  applicantEmail,
  previewPageLink,
  applyPageLink,
  likeStatus,
  ...rest
}) => {
  // const colour = {
  // 	admin: "dBlue.200",
  // 	connectPage: "dOrange.300",
  // }
  // console.log(jobDatabaseId)

  // const hidden =
  //   pagetype === 'blog' ||
  //   pagetype === 'generic' ||
  //   pagetype === 'home' ||
  //   pagetype === 'connect-home' ||
  //   pagetype === 'login';

  return (
    <Box
      className="innersidebar sticky"
      bg={pagetype === 'myjobs' ? 'gray.300' : 'gray.200'}
      w="280px"
      position="sticky"
      top="0"
      alignSelf="flex-start"
      minH="100vh"
      p="4"
      flexShrink="0"
      display={{
        base: 'none',
        sm: 'none',
        md: 'block',
      }}
      {...rest}
    >
      <VStack spacing="4" h="full" {...rest}>
        {primaryLinks && (
          <VStack
            spacing="0"
            border="1px solid"
            color="gray.900"
            w="100%"
            rounded="sm"
          >
            <Flex
              align="center"
              bg="gray.900"
              fontSize="xs"
              textAlign="start"
              rounded="sm"
              color="gray.300"
              w="100%"
              py="1"
              pl="2"
            >
              <Icon as={BsFillLightningFill} mr="1" />
              Quick Links
            </Flex>
            {primaryLinks.map((link, i) => (
              <LinkBox
                key={i}
                _hover={{ bg: 'whiteAlpha.400' }}
                borderBottom={
                  i !== primaryLinks.length - 1 ? '1px solid' : null
                }
                // borderColor="gray.50"
                w="100%"
                pt="1"
              >
                <LinkOverlay as={Link} to={link[1]}>
                  <Heading size="md" color="inherit" px="2" py="1">
                    {link[0]}
                  </Heading>
                </LinkOverlay>
              </LinkBox>
            ))}
          </VStack>
        )}
        {/* {
					secondaryLinks && (
						<VStack spacing="0" border="1px solid" color="gray.50" w="100%" rounded="sm">
							<Flex align="center" bg="gray.50" fontSize="xs" textAlign="start" rounded="sm" color="dBlue.300" w="100%" py="1" pl="2"><Icon as={BsInfoCircleFill} mr="1"/>Useful Links</Flex>
							{secondaryLinks.map((link, i) => (
								<LinkBox 
								key={i} 
									_hover={{ bg: 'whiteAlpha.400' }}
									borderBottom={i !== secondaryLinks.length -1 ? "1px solid" : null}
									// borderColor="gray.50"
									w="100%"
									pt="1"
								>
									<LinkOverlay as={Link} to={link[1]}>
										<Text fontSize="sm" color="inherit" px="2" py="1">{link[0]}</Text>
									</LinkOverlay>
								</LinkBox>
							))}
						</VStack>
					)
				} */}
        {pagetype === 'jobs-board' && (
          <JobsFilter
            locations={locations}
            setLocations={setLocations}
            sectors={sectors}
            setSectors={setSectors}
            jobTypes={jobTypes}
            setJobTypes={setJobTypes}
            skills={skills}
            setSkills={setSkills}
          />
        )}

        {pagetype === 'job-post' && (
          <JobSidebar
            jobLocation={jobLocation}
            sector={sector}
            jobType={jobType}
            jobSkills={jobSkills}
            salary={salary}
            closeDate={closeDate}
            companyBio={companyBio}
            companyName={companyName}
            salaryStructures={salaryStructures}
            jobId={jobId}
            jobDatabaseId={jobDatabaseId}
            handleClick={handleClick}
            toBeLiked={toBeLiked}
            thisJobAppliedFor={thisJobAppliedFor}
            likeStatus={likeStatus}
          />
        )}
        {pagetype === 'myjobs' && (
          <Button
            as={Link}
            variant="outline"
            to="/maker/jobs/post"
            w="100%"
            mt="2"
            color="gray.50"
            rounded="full"
            _hover={{ bg: 'gray.50', color: 'dBlue.300' }}
          >
            Post an Opportunity
          </Button>
        )}
        {pagetype === 'application' && (
          <>
            <Flex
              px="2"
              py="4"
              justify="center"
              align="center"
              w="100%"
              mt="8"
              color="gray.900"
              rounded="full"
              bg="dYellow.300"
              _hover={{ bg: 'dYellow.200' }}
              cursor="pointer"
            >
              <a href={`mailto: ${applicantEmail}`}>
                <Text fontWeight="500">Email Applicant</Text>
              </a>
            </Flex>
            <Text>{`Email: ${applicantEmail}`}</Text>
          </>
        )}

        {pagetype === 'application-form' && (
          <Box alignSelf="center" w="100%">
            <Button
              as={ScrollLink}
              variant="outline"
              to="preview"
              w="100%"
              mt="2"
              color="gray.50"
              rounded="full"
              bg="dYellow.300"
              _hover={{ bg: 'dYellow.200' }}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              cursor="pointer"
            >
              Preview
            </Button>
            <Button
              as={ScrollLink}
              variant="outline"
              to="applyBtn"
              w="100%"
              mt="4"
              mt="2"
              color="gray.50"
              rounded="full"
              bg="dBlue.300"
              _hover={{ bg: 'dBlue.200' }}
              spy={true}
              smooth={true}
              offset={-470}
              duration={500}
              cursor="pointer"
            >
              Apply
            </Button>
          </Box>
        )}

        {pagetype === 'job-form' && <JobPreviewCard formDeets={formDeets} />}

        {/* <Button variant="outline" color="gray.50" w="full" disabled={!completed}> Post an Opportunity</Button> */}
      </VStack>
    </Box>
  );
};
