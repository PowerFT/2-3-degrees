import React from 'react'
import { BlogGrid } from '../../../components/blog/BlogGrid'
import { BlogCard } from '../../../components/blog/BlogCard'
import { Box, Heading } from '@chakra-ui/react'

export const LatestBlog = ({ blogPosts }) => {
	//console.log(blogPosts)
	
	return (
		<Box px={{base:"0",sm:"4"}} pb={{base:"8", sm: "12"}}>
			<Heading size="4xl" textAlign="center" mb="8" mt="10">
				Featured Articles
			</Heading>
			<BlogGrid archiveLink="/blog">
				{ blogPosts?.map(post=> (<BlogCard key={post.id} postData={post} />)) }
			</BlogGrid>
		</Box>
	
	)
}