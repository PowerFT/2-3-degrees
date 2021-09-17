import React from 'react'
import { BlogGrid } from '../../../components/blog/BlogGrid'
import { BlogCard } from '../../../components/blog/BlogCard'
import { Box, Heading } from '@chakra-ui/react'

export const LatestBlog = ({ blogPosts }) => {
	//console.log(blogPosts)
	
	return (
		<Box p="4">
			<Heading size="4xl" textAlign="center" mb="8" mt="10">
				Featured Articles
			</Heading>
			<BlogGrid archiveLink="/blog">
				{ blogPosts?.map(post=> (<BlogCard postData={post} />)) }
			</BlogGrid>
		</Box>
	
	)
}