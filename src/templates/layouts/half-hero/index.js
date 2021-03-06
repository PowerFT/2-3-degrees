import {
  Box,
  useColorModeValue as mode,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BgImage } from "../../../components/BgImage";

export const HalfHero = ({
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

  return (
    <Box
      as="section"
      className="half-hero"
      bg={bgCol}
      pb={{ base: "0" }}
      pos="relative"
      px={{
        base: "0",
        md: "12",
      }}
    >
      <Box
        w={{ base: "100%", md: "50%" }}
        maxW={{
          md: "md",
          xl: "xl",
        }}
        pt={{
          base: "12",
          md: "40",
        }}
        pb={{
          base: "12",
          md: "24",
        }}
        px={{
          base: "6",
          md: "0",
        }}
        zIndex="2"
        position="relative"
      >
        <Heading
          as="h1"
          size="3xl"
          lineHeight="1"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={titleColour}
        >
          {title}
        </Heading>
        <Text mt={4} fontSize="xl" fontWeight="medium" color={subTitleColour}>
          {text}
        </Text>
        {button && (
          <Button
            as={GatsbyLink}
            to={buttonLink}
            fontWeight="400"
            direction="down"
            mt="6"
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

      <Box
        pos={{
          md: "absolute",
        }}
        insetY={{
          md: "0",
        }}
        insetEnd={{
          md: "0",
        }}
        bg="gray.50"
        w={{
          base: "full",
          md: "51%",
        }}
        height={{
          base: "96",
          md: "full",
        }}
        sx={{
          clipPath: {
            md:
              title.toLowerCase() === "mastering the future"
                ? "none"
                : "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          backgroundColor:
            title.toLowerCase() === "mastering the future"
              ? "#eae7dc"
              : "#ffffff",
        }}
        zIndex="2"
        position="relative"
      >
        {image && (
          <GatsbyImage
            className="image"
            image={imageData}
            alt={image?.altText}
            imgStyle={{
              objectFit:
                title.toLowerCase() === "mastering the future"
                  ? "contain"
                  : "cover",
            }}
          />
        )}
      </Box>
      {bgPatternCol && <BgImage bgPatternCol={bgPatternCol} />}
    </Box>
  );
};
