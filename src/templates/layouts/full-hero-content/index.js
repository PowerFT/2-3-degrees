import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { BgImage } from "../../../components/BgImage";
// import AniLink from "gatsby-plugin-transition-link/AniLink"

export const FullHeroContent = ({
  image,
  title,
  text,
  button,
  bgCol,
  bgPatternCol,
  titleColour,
  subTitleColour,
  buttonColour,
}) => {
  const imageData = getImage(image?.localFile);
  const buttonTitle = button?.title;
  const buttonLink = button?.url;

  const htmlDecode = (content) => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

  return (
    <Flex
      as="section"
      bg={bgCol}
      direction="column"
      position="relative"
      justify="center"
      align="center"
      overflow="hidden"
    >
      <Box
        maxW="3xl"
        // mx="auto"
        px={{ base: "4", lg: "8" }}
        py={{ base: "8", sm: "20" }}
        textAlign="center"
        zIndex={1}
        position="relative"
        color="white"
        className="fullhero-content"
      >
        <Heading
          as="h1"
          color={titleColour}
          fontSize={{ base: "50px", sm: "65px", md: "100px" }}
          fontWeight="900"
          letterSpacing="tight"
        >
          {title}
        </Heading>
        {text && (
          <Text
            mt="4"
            fontSize="lg"
            color={subTitleColour}
            dangerouslySetInnerHTML={{ __html: htmlDecode(text) }}
          ></Text>
        )}
        {button && (
          <Button
            as={Link}
            textDecoration="none"
            fontWeight="500"
            direction="down"
            to={buttonLink}
            mt="8"
            size="md"
            rounded="full"
            bg={buttonColour}
            color={
              buttonColour === "gray.900" || buttonColour === "gray.600"
                ? "gray.50"
                : "gray.900"
            }
            _hover={{ bg: "lighter" }}
          >
            {buttonTitle}
          </Button>
        )}
      </Box>

      {image && (
        <Flex
          class="image-wrapper"
          position="absolute"
          insetX="0"
          insetY="0"
          w="full"
          h="full"
          overflow="hidden"
          align="center"
        >
          <Box position="relative" w="full" h="full">
            <GatsbyImage
              image={imageData}
              alt={image.altText}
              objectFit="cover"
              loading="eager"
            />
          </Box>
        </Flex>
      )}

      {bgPatternCol && <BgImage bgPatternCol={bgPatternCol} />}
    </Flex>
  );
};
