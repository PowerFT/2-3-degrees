import { Box, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export const ConnectHero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Flex
      as="section"
      h={{ base: '70vh', sm: '90vh' }}
      // bg="dBlue.300"
      // bgGradient="linear(dBlue.300 0%, dBlue.300 80%, transparent 100%)"
      bg="dBlue.300"
      direction="column"
      position="relative"
      justify={{ base: 'flex-end', sm: 'center' }}
      px={{ base: '4', md: '12' }}
      w="full"
    >
      <Box
        maxW="3xl"
        // mx="auto"
        // px={{ base: '4', lg: '8' }}
        py={{ base: '8', sm: '20' }}
        // textAlign="center"
        zIndex="2"
        position="relative"
        color="white"
        // style={{transform: `translateY(${offsetY * 0.18}px) `}}
      >
        <Heading
          as="h1"
          color="gray.50"
          fontSize={{ base: '90px', sm: '110px', md: '120px' }}
          letterSpacing="tight"
          textTransform="uppercase"
          maxW="2xl"
          lineHeight="1"
        >
          <Box as="mark" bg="transparent" color="inherit" fontWeight="300">
            Welcome{' '}
          </Box>
          <Box as="mark" bg="transparent" color="inherit" fontWeight="100">
            to{' '}
          </Box>
          <Box as="mark" bg="transparent" color="inherit" fontWeight="600">
            the{' '}
          </Box>
          <Box as="mark" bg="transparent" color="inherit" fontWeight="900">
            Connect{' '}
          </Box>
          <Box as="mark" bg="transparent" color="inherit" fontWeight="600">
            Platform{' '}
          </Box>
        </Heading>
      </Box>
      <Box
        w={{ md: '80%', lg: '65%' }}
        h="120%"
        pos="absolute"
        bottom="0"
        right="0"
        zIndex="1"
        id="pattern"
        top="0%"
        style={{ transform: `translateY(-${offsetY * 0.2}px) ` }}
      >
        <StaticImage
          src="../../images/pattern-rectangle.png"
          alt="shape pattern"
          // height={400}
          fit="cover"
          imgStyle={{
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'top',
          }}
          style={{ height: '100%', width: 'auto' }}
        />
      </Box>
      <Box
        w={{ md: '80%', lg: '65%' }}
        h="120%"
        pos="absolute"
        bottom="0"
        right="0"
        zIndex="1"
        id="pattern"
        top="0%"
        style={{ transform: `translateY(-${offsetY * 0.4}px) ` }}
      >
        <StaticImage
          src="../../images/pattern-circle.png"
          alt="shape pattern"
          // height={400}
          fit="cover"
          imgStyle={{
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'top',
          }}
          style={{ height: '100%', width: 'auto' }}
        />
      </Box>
      <Box
        w={{ md: '80%', lg: '65%' }}
        h="120%"
        pos="absolute"
        bottom="0"
        right="0"
        zIndex="1"
        id="pattern"
        top="0%"
        style={{ transform: `translateY(-${offsetY * 0.6}px) ` }}
      >
        <StaticImage
          src="../../images/pattern-triangle.png"
          alt="shape pattern"
          // height={400}
          fit="cover"
          imgStyle={{
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'top',
          }}
          style={{ height: '100%', width: 'auto' }}
        />
      </Box>
    </Flex>
  );
};
