/**
 * External dependencies
 */
import React, { useState } from 'react';
import { Flex } from '@chakra-ui/layout';
/**
 * External dependencies
 */
// import { useAuth } from '../../hooks'
import { MySpinner } from '../waiting/MySpinner';
import { Header } from '../layout/Header';
import { Content } from '../layout/Content';
import { SimpleGrid } from '@chakra-ui/react';
import { MyPublishedJobsList } from './my-jobs-list/MyPublishedJobs';
import { MyDraftJobsList } from './my-jobs-list/MyDraftJobs';
import { MyError } from '../waiting/MyError';

const MyJobs = () => {
  // const [statusSelected, setStatusSelected] = useState('PUBLISH')
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // if (loading) return <MySpinner />;
  // if (error) return <MyError error={error}/>;

  return (
    <>
      <Header
        title="My Opportunities"
        subTitle="Edit, view your opportunity posts"
        pagetype="myjobs"
      />
      <Flex w="100%">
        {/* <InnerSidebar
					pagetype={pagetype}
					// setStatusSelected={setStatusSelected}
				/>	 */}
        <Content>
          <SimpleGrid
            columns={{
              sm: 1,
              md: 2,
              // lg: 3
            }}
            spacing={{
              // sm: 6,
              md: 6,
              lg: 12,
            }}
            p="4"
          >
            <MyPublishedJobsList />
            <MyDraftJobsList />
          </SimpleGrid>

          {/*<Box w="100%" p="2" bg="gray.300" display={{lg:"none"}}>
						 <Accordion allowMultiple mt="2" maxW={{base:"xs",sm:"sm"}} mx="auto">
								<AccordionItem>
									{({ isExpanded }) => (
										<>
											<h2>
												<AccordionButton bg="gray.50" px="2" py="3">
													<Box flex="1" textAlign="left" fontWeight="600">
														Post Status
													</Box>
													{isExpanded ? (
														<MinusIcon fontSize="12px" color="gray.800"/>
													) : (
														<AddIcon fontSize="12px" color="gray.800"/>
													)}
												</AccordionButton>
											</h2>
											<AccordionPanel bg="whiteAlpha.600" p={0} maxH="200px" overflow="auto">
												<Box
													width="100%"
													py="1"
													px="2"
													fontSize="sm"
													cursor="pointer"
													_hover={{ bg: "whiteAlpha.700" }}
													// _active={{
													// 	bg: "#dddfe2",
													// 	transform: "scale(0.98)",
													// 	borderColor: "#bec3c9",
													// }}
													onClick={(e) => setStatusSelected("PUBLISH")}
												>
													Published
												</Box>
												<Box
													width="100%"
													py="1"
													px="2"
													fontSize="sm"
													cursor="pointer"
													_hover={{ bg: "whiteAlpha.700" }}
													// _active={{
													// 	bg: "#dddfe2",
													// 	transform: "scale(0.98)",
													// 	borderColor: "#bec3c9",
													// }}
													onClick={(e) => setStatusSelected("DRAFT")}
												>
													Pending
												</Box>
											</AccordionPanel>
										</>
									)}
								</AccordionItem>
							</Accordion>
					</Box> */}

          {/* <Box p="6"><Text fontSize="lg">{statusSelected === "DRAFT" ? "Opportunities: Pending" : "Opportunities: Published"}</Text></Box> */}
          {/* <JobsList setError={setError} setLoading={setLoading} statusSelected={statusSelected} /> */}
        </Content>
      </Flex>
    </>
  );
};

export default MyJobs;
