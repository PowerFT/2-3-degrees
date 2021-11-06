import React from 'react';
import {
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

export const BlogCard = ({ postData, i, connectBlog }) => {
  const { title, uri, featuredImage, date } = postData;
  console.log(i);

  const image = getImage(featuredImage?.node?.localFile);
  const altText = featuredImage?.node?.localFile?.altText;

  return (
    <LinkBox
      as="article"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        shadow: {
          sm: 'lg',
        },
        bg: {
          sm: mode('white', 'gray.700'),
        },
      }}
    >
      <Flex direction="column">
        {i < 3 && <GatsbyImage alt={altText || 'image'} image={image} />}
        <Flex
          direction="column"
          // px={{
          // 	sm: '6',
          // }}
          py="5"
          pl="2"
          pr="6"
        >
          <Text
            as="h4"
            fontSize={{ base: '2.5rem', sm: '3rem', md: '1rem', lg: '2rem' }}
            fontWeight="500"
            mb="2"
            noOfLines={2}
          >
            <LinkOverlay
              as={Link}
              to={connectBlog ? `/connect/blog${uri}` : `/blog${uri}`}
            >
              {title}
            </LinkOverlay>
          </Text>
          <Flex
            align="baseline"
            justify="space-between"
            fontSize="sm"
            color={mode('gray.600', 'gray.400')}
          >
            <Text>{date}</Text>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  );
};
