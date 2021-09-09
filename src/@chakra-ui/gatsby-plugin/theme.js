import { theme as defaultTheme, extendTheme } from "@chakra-ui/react"

const theme = {
  ...defaultTheme,
	colors: {
    ...defaultTheme.colors,
		dOrange: {
			100: "#FFD4C2",
			200: "#FF8D5C",
			300: "#FF6A29",
			400: "#CC3D00",
			500: "#661F00",
		},
		dBlue: {
			100: "#D7FCFE",
			200: "#88F6FC",
			300: "#06D7E2",
			400: "#04979F",
			500: "#024C50",
		},
		dYellow: {
			100: "#FFF8D6",
			200: "#FFE770",
			300: "#FFD600",
			400: "#CCAA00",
			500: "#7A6600",
			600: "#FFE770",
			700: "#FFD600",
			800: "#CCAA00",
			900: "#7A6600",
		}
  },
	fonts: {
    heading: "Big Shoulders Display",
    body: "Roboto",
  },
};

export default extendTheme(theme);