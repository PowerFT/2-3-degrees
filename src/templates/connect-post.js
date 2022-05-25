import React from 'react';
import { getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';

import { Box, Text, HStack, Flex } from '@chakra-ui/react';

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/wordpress.css"
// import "@wordpress/block-library/build-style/style.css"
import '../css/wordpress.css';
import '../css/style.css';
import Seo from '../components/seo';
import { Header } from '../components/layout/Header';

const BlogPostTemplate = ({ data: { post } }) => {
  const imageData = getImage(post.featuredImage?.node?.localFile);
  const ImgAlt = post.featuredImage?.node?.alt || ``;

  const pagetype = 'blog';

  return (
    <Box
      as="article"
      className="blog-post"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Seo title={post.title} description={post.excerpt} />
      <Header
        title={parse(post.title)}
        subTitle={parse(post.excerpt)}
        imageData={imageData}
        imageAlt={ImgAlt}
        pagetype={pagetype}
      />
      <Flex w="100%" direction="column" maxW="xl" mx="auto" mb="16">
        <Box className="blog__body--content wp-content" px="4">
          <HStack
            spacing="0"
            align="center"
            justify="space-between"
            my="8"
            wrap="wrap"
          >
            <HStack mb="2" mr="2">
              {post.categories?.nodes.map((cat) => (
                <Box
                  key={cat?.id}
                  borderRadius="full"
                  bg="dBlue.300"
                  color="gray.50"
                  px={6}
                  py={0}
                >
                  {cat.name}
                  {/* <Link as={GatsbyLink} to={cat.uri}></Link>  */}
                </Box>
              ))}
            </HStack>
            <Text
              as="span"
              mb="2"
              mr="2"
              fontSize="sm"
              m="0 !important"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {post.date}
            </Text>
          </HStack>
          {post.content && parse(post.content)}
        </Box>
      </Flex>
    </Box>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query ConenctBlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          uri
          id
        }
      }
      tags {
        nodes {
          name
          uri
          id
        }
      }
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(quality: 90) {
                src
                srcSet
                aspectRatio
              }
              gatsbyImageData
            }
          }
        }
      }
    }
    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`;
