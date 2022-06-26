import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  AspectRatio,
} from "@chakra-ui/react";
import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { BgImage } from "../../../components/BgImage";
// import AniLink from "gatsby-plugin-transition-link/AniLink"
import { FaPlay } from "react-icons/fa";

export const FullHeroAbout = ({
  image,
  title,
  text,
  button,
  bgCol,
  bgPatternCol,
  titleColour,
  subTitleColour,
  buttonColour,
  youtubeVideoUrl,
  youtubeVideoThumbnail,
}) => {
  const imageData = getImage(image?.localFile);
  const buttonTitle = button?.title;
  const buttonLink = button?.url;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const youtubeVideoThumbnailData = getImage(youtubeVideoThumbnail?.localFile);

  console.log(youtubeVideoThumbnail);

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
      <div className="about-fullhero-video">
        <Box
          maxW="3xl"
          // mx="auto"
          px={{ base: "4", lg: "8" }}
          py={{ base: "8", sm: "20" }}
          textAlign="center"
          zIndex={1}
          position="relative"
          color="white"
          className="about-fullhero-left"
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
              as="div"
              dangerouslySetInnerHTML={{ __html: text }}
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
        {/* <iframe
          src={youtubeVideoUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
        <Flex
          position="relative"
          align="center"
          justify="center"
          _hover={{ color: "dYellow.300" }}
          color="gray.50"
          onClick={onOpen}
          cursor="pointer"
          className="about-fullhero-right"
        >
          <Icon
            as={FaPlay}
            position="absolute"
            mx="auto"
            my="auto"
            zIndex="10"
            color="inherit"
            w="4rem"
            h="4rem"
            shadow="xl yellow"
            transition="transform .25s ease-in-out"
            _hover={{ transform: "translateY(-5px)" }}
          />
          <Modal isOpen={isOpen} onClose={onClose} size="3xl" padding="12">
            <ModalOverlay />
            <ModalContent maxW="3xl" p={{ base: "2" }} bg="transparent">
              <ModalCloseButton color="gray.50" />
              <ModalBody bg="black" px={{ base: "2", sm: "12" }} py="12">
                <AspectRatio maxW="560px" ratio={1.25} mx="auto">
                  <iframe
                    title="YouTube video player"
                    src={`${youtubeVideoUrl}?autoplay=1`}
                    allowFullScreen
                  />
                </AspectRatio>
              </ModalBody>
            </ModalContent>
          </Modal>

          {youtubeVideoThumbnailData && (
            <GatsbyImage
              image={youtubeVideoThumbnailData}
              alt={youtubeVideoThumbnailData?.altText || "about image"}
              objectFit="cover"
            />
          )}
        </Flex>
      </div>
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
