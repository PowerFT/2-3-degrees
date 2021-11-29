import React from 'react';
import {
  Heading,
  Flex,
  SimpleGrid,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { BgImage } from '../../../components/BgImage';
import { Link } from 'gatsby';

export const TextList = ({
  title,
  list,
  bgCol,
  bgPatternCol,
  titleCol,
  listTextCol,
  listItemCol,
}) => {
  return (
    <Flex
      as="section"
      align="center"
      justify="center"
      p={{ base: '4', md: '8' }}
      direction="column"
      className="pillars"
      bg={bgCol}
      pos="relative"
      minH="75vh"
    >
      <Heading
        textAlign="center"
        color={titleCol}
        size="3xl"
        mt={{ base: '8', sm: '10' }}
        zIndex="10"
      >
        {title}
      </Heading>

      <SimpleGrid
        columns={{ md: 1, lg: 3 }}
        spacing={{ base: '8', md: '12', lg: '8' }}
        // px={{ base: '6', lg: '8' }}
        mt={{ base: '8', sm: '10' }}
        mb={{ base: '16', sm: '20' }}
        w="100%"
        zIndex="10"
      >
        {list?.map((item, i) => (
          <LinkBox>
            <Flex
              key={i}
              bg={listItemCol}
              w="100%"
              h="100%"
              // justify="space-between"
              align="center"
              textAlign="center"
              color={listTextCol}
              direction="column"
              p={{ base: '2', sm: '3' }}
              _hover={item.link && { border: '1px solid' }}
            >
              <Heading color="inherit">
                <LinkOverlay as={Link} to={item?.link?.url}>
                  {item.title}
                </LinkOverlay>
              </Heading>
              <Text color="inherit" mt={{ base: '1', sm: '4' }}>
                {item.text}{' '}
              </Text>
            </Flex>
          </LinkBox>
        ))}
      </SimpleGrid>

      {bgPatternCol && <BgImage bgPatternCol={bgPatternCol} />}
    </Flex>
  );
};
