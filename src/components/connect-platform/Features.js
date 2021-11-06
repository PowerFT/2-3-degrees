import React from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'gatsby';
import { HiSpeakerphone, HiUserCircle, HiSearchCircle } from 'react-icons/hi';
import {
  VscAccount,
  VscMail,
  VscMegaphone,
  VscPinned,
  VscPreview,
} from 'react-icons/vsc';
import { AccountProgress } from './AccountProgress';

const Feature = (props) => {
  const { title, icon, featureLink, complete } = props;
  return (
    // <LinkBox >
    //   <Flex rounded="lg" direction="row" align="center" cursor={!complete ? "not-allowed" : "pointer"} bg={!complete ? "gray.300" : "dOrange.300"} p={{base:"5",sm:"10"}} _hover={{bg: "dOrange.200"}} h="100%">
    //
    //     <Stack mx="auto">
    //       <Heading as="h3" textAlign="center" color="gray.700" size="xl">
    // 					<LinkOverlay as={Link} to=>{title}</LinkOverlay>
    //       </Heading>
    //     </Stack>
    //   </Flex>
    // </LinkBox>
    <LinkBox>
      <HStack
        color="gray.800"
        bg="transparent"
        color={!complete ? 'gray.300' : 'gray.800'}
        rounded="full"
        _hover={{ bg: !complete ? 'transparent' : 'dYellow.300' }}
        transition="all .25s"
        px="3"
        py="3"
      >
        <Box color="inherit" fontSize="2rem" mr="1">
          {icon}
        </Box>
        <Text
          color="inherit"
          fontWeight="500"
          fontSize={{ base: 'lg', sm: 'lg', lg: 'xl' }}
        >
          {complete ? (
            <LinkOverlay as={Link} to={featureLink}>
              {title}
            </LinkOverlay>
          ) : (
            <Text cursor="not-allowed">{title}</Text>
          )}
        </Text>
      </HStack>
    </LinkBox>
  );
};

export const Features = ({ complete, completed, limit, user }) => {
  return (
    <>
      <SimpleGrid
        flex="1"
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        spacing="3"
        pt={{ base: '16' }}
        px="6"
        w="100%"
        justifyItems="center"
      >
        {user === 'maker' ? (
          <>
            <Feature
              complete={complete}
              featureLink="/maker/jobs/post"
              title="Post an Opportunity"
              icon={<VscMegaphone />}
            />
            <Feature
              complete={complete}
              featureLink="/connect/jobs"
              title="Opportunity Board"
              icon={<VscPreview />}
            />
            <Feature
              complete={complete}
              featureLink="/maker/jobs"
              title="My Opportunities"
              icon={<VscPinned />}
            />
            <Feature
              complete={complete}
              featureLink="/connect/platform#connectContent"
              title="Exclusive Content"
              icon={<VscAccount />}
            />
          </>
        ) : user === 'talent' ? (
          <>
            <Feature
              complete={complete}
              featureLink="/connect/jobs"
              title="Opportunity Board"
              icon={<HiSearchCircle />}
            />
            <Feature
              complete={complete}
              featureLink="/connect/platform#connectContent"
              title="Exclusive Content"
              icon={<HiSpeakerphone />}
            />
            <Feature
              complete={complete}
              featureLink="/connect/platform#opportunityTags"
              title="Search Jobs by Skill"
              icon={<HiSearchCircle />}
            />
            <Feature
              complete={complete}
              featureLink="/talent/account"
              title="Update Account"
              icon={<HiUserCircle />}
            />
          </>
        ) : (
          <></>
        )}
      </SimpleGrid>

      <AccountProgress
        complete={complete}
        user={user}
        limit={limit}
        completed={completed}
      />
    </>
  );
};
