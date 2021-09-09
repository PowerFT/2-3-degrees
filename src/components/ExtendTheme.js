// 1. Import `extendTheme`
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const ExtendTheme = extendTheme(
  // config: {
  //   initialColorMode: "light",
  //   useSystemColorMode: false,
  // },
  
  
  // withDefaultColorScheme({
  //   colorScheme: "blue",
  //   components: ["Alert", "Table"],
  // }),
  {
    colors: {
      deg: {
        100: "#F3FED8",
        200: "#E8FCB1",
        300: "#DCFA89",
        400: "#cef85c",
        500: "#bff628",
        600: "#a0d709",
        700: "#83b007",
        800: "#668806",
        900: "#3a4e03",
      },
    },
    components: {
      Button: {
        // 1. We can update the base styles
        baseStyle: {
          fontWeight: "bold", // Normally, it is "semibold"
        },
        // 2. We can add a new button size or extend existing
        sizes: {
          xl: {
            h: "56px",
            fontSize: "2xl",
            px: "32px",
          },
        },
        // 3. We can add a new visual variant
        variants: {
          "with-shadow": {
            bg: "red.400",
            boxShadow: "0 0 2px 2px #efdfde",
          },
          // 4. We can override existing variants
          solid: (props) => ({
            bg: props.colorMode === "dark" ? "red.300" : "red.500",
          }),
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "red",
    components: ["Button", "Badge"],
  }),
  
  // fonts: {
  //   heading: "Big Shoulders Display",
  //   body: "Open Sans",
  // },

  // global: {
  //   // styles for the `body`
  //   body: {
  //     // bg: "gray.400",
  //     // color: "white",
  //   },
  //   // styles for the `a`
  //   // a: {
  //   // 	color: "teal.500",
  //   // 	_hover: {
  //   // 		textDecoration: "underline",
  //   // 	},
  //   // },
  // },
)