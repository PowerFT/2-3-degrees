import React from 'react';
import downloadFile from '../../downloads/2-3-degrees-e-guide.pdf';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { StaticImage } from 'gatsby-plugin-image';

export const ConnectDownloads = () => (
  <HStack px="6" py="16" w="100%" justify="center" align="center" wrap="wrap">
    <Box
      rounded="full"
      bg="dBlue.300"
      px={{ base: '12', sm: '24' }}
      py={{ base: '6', sm: '12' }}
      _hover={{ bg: 'dBlue.200', transform: 'scale(1.08)' }}
      transition="all .25s"
      cursor="pointer"
      w="fit-content"
      zIndex="2"
      // flex="1 1 70%"
    >
      <a href={downloadFile} download>
        <Text fontSize="xl" fontWeight="500">
          Download the E-Guide
        </Text>
      </a>
      {` `}
    </Box>
    <StaticImage
      src="../../downloads/e-guide-image.png"
      alt="E-Guide image"
      // height={400}
      imgStyle={{ width: '300px', height: 'auto' }}
      style={{
        background: 'blue',
        height: 'auto',
        width: '300px',
        margin: '20px',
      }}
    />
  </HStack>
);
