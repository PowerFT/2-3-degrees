import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import { BlogGrid } from '../blog/BlogGrid'
import { BlogCard } from '../blog/BlogCard'
import { Box, Heading } from '@chakra-ui/react'

export const ConnectBlogBlock = ({ data }) => {

  // console.log("data" , data)
	
	
	return (
		<StaticQuery
    query={connectBlogQuery}
    render={data => {
      const posts = data.allWpPost?.nodes
      return (
        <Box alignSelf="stretch" py="12">
          <Heading size="4xl" textAlign="center" mb="4">
            Connected Content
          </Heading>
          <BlogGrid archiveLink="/blog">
            { posts?.map(post=> (<BlogCard postData={post} />)) }
          </BlogGrid>
        </Box>
      )}}
			
		/>
	
	)
}

const connectBlogQuery = graphql`
  query connectBlogQuery {
    allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "Connect"}}}}}) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(quality: 90) {
                  src
                  srcSet
                }
                gatsbyImageData(aspectRatio: 1.1)
              }
            }
            altText
          }
        }
      }
    }
  }
`