import React from 'react';
import { BlogGrid } from '../../../components/blog/BlogGrid';
import { BlogCard } from '../../../components/blog/BlogCard';
import { Box, Heading } from '@chakra-ui/react';

export const LatestBlog = ({ title, subTitle, posts }) => {
  console.log(title, subTitle, posts);

  return (
    <Box px={{ base: '0', sm: '4' }} pb={{ base: '8', sm: '12' }}>
      <Heading size="3xl" textAlign="center" mb="8" mt="10">
        {title}
      </Heading>
      <BlogGrid archiveLink="/blog">
        {posts?.map((post, i) => (
          <BlogCard key={i} i={i} postData={post} />
        ))}
      </BlogGrid>
    </Box>
  );
};
