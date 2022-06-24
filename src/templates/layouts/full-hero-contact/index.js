import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { BgImage } from "../../../components/BgImage";
// import AniLink from "gatsby-plugin-transition-link/AniLink"
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { HiOfficeBuilding } from "react-icons/hi";

export const FullHeroContact = ({
  image,
  title,
  mapUrl,
  phone,
  mail,
  address,
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

  return (
    <>
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
          {phone && (
            <div className="contact-page-icon">
              <AiFillPhone />
              <Text mt="4" fontSize="lg" color={subTitleColour}>
                {phone}
              </Text>
            </div>
          )}
          {mail && (
            <div className="contact-page-icon">
              <AiTwotoneMail />
              <Text mt="4" fontSize="lg" color={subTitleColour}>
                {mail}
              </Text>
            </div>
          )}
          {address && (
            <div className="contact-page-icon">
              <HiOfficeBuilding />
              <Text
                mt="4"
                fontSize="lg"
                color={subTitleColour}
                dangerouslySetInnerHTML={{ __html: address }}
              ></Text>
            </div>
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
      {mapUrl && (
        <iframe
          src={mapUrl}
          style={{
            border: 0,
            width: "100%",
            height: "400px",
          }}
          allowFullAcreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </>
  );
};
