import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import parse from 'html-react-parser';
import { BgImage } from '../../../components/BgImage';

export const RichTextBlock = ({ richText, bgCol, textCol, bgPatternCol }) => {
  // const imageData = getImage(image?.localFile);
  // const pagetype = 'page';
  //console.log("page",image)
  //console.log("page image data",imageData)
  console.log(bgCol, textCol);
  console.log(bgCol, textCol);
  return (
    <>
      {richText && (
        <Flex as="section" w="100%" background={bgCol} pos="relative">
          <Box
            className="pageblock__body--content wp-content"
            maxW="2xl"
            mx="auto"
            my="12"
            px="12"
            py="6"
            color={textCol}
            id={textCol}
            bg={bgCol}
            zIndex="1"
          >
            {parse(richText)}
          </Box>
          {bgPatternCol && <BgImage bgPatternCol={bgPatternCol} />}
        </Flex>
      )}
    </>
  );
};
