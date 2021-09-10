import React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import parse from "html-react-parser"

import { Box, Heading, Text, Link, HStack, Flex } from "@chakra-ui/react"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/wordpress.css"
// import "@wordpress/block-library/build-style/style.css"
import "../css/wordpress.css"
import "../css/style.css"
import Seo from "../components/seo"
import { Header } from "../components/layout/Header"

const BlogPostTemplate = ({ data: { post } }) => {
	console.log(post)

  const imageData = getImage(post.featuredImage?.node?.localFile)
  const ImgAlt = post.featuredImage?.node?.alt || ``

  const pageType = "blog"

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
				pageType={pageType}
			/>
			<Flex w="100%" direction="column" maxW="xl" mx="auto">
				<Box className="blog__body--content wp-content">
          <HStack  align="center" justify="space-between" my="8">
            <HStack>
              {post.categories?.nodes.map(cat => (
                <Box key={cat.id} borderRadius="full" bg="dBlue.300" color="gray.50" px={6} py={0}>
                  {cat.name}
                  {/* <Link as={GatsbyLink} to={cat.uri}></Link>  */}
                </Box>
              ))}
            </HStack>
            <Text as="span" fontSize="sm" m="0 !important" fontWeight="bold" textTransform="uppercase">{post.date}</Text>
          </HStack>
          {parse(post.content)}
				</Box>
			</Flex>
      
      {/* <Box
				as="article"
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Box as="header">

            <GatsbyImage
              image={imageData}
              alt={ImgAlt}
            />


					<Box  w="2xl" mx="auto" mt="-50px" zIndex={1} bg="white" position="relative" p={10}>
						<Text as="p" fontSize="xs" textTransform="uppercase">{post.date}</Text>
						<Heading as="h1" size="2xl" itemProp="headline">{parse(post.title)}</Heading>
          	<Text as="p">{post.author.node.name}</Text>
						<Text fontSize="lg">{parse(post.excerpt)}</Text>
					</Box>

        </Box>

        <Box w="2xl" mx="auto" px={10}>
          {!!post.content && (
            <Box as="section" mt="2em" className="post__content wp-content"  itemProp="articleBody">{parse(post.content)}</Box>
          )}

          <Box>
            {post.categories.nodes.map(cat => (
              <Box key={cat.id} as="button" borderRadius="md" bg="tomato" color="white" px={4} h={8}>
                <Link as={GatsbyLink} to={cat.uri}>{cat.name}</Link> 
              </Box>
            ))}
          </Box>
        </Box>

        

      </Box> */}

      {/* <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Box>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
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
`