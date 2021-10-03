import { theme as defaultTheme, extendTheme } from "@chakra-ui/react"

const theme = {
  ...defaultTheme,
	colors: {
    ...defaultTheme.colors,
		dOrange: {
			100: "#FFD4C2",
			200: "#FF8D5C",
			300: "#f67011",
			400: "#CC3D00",
			500: "#661F00",
		},
		dBlue: {
			100: "#D7FCFE",
			200: "#88F6FC",
			300: "#7cd8d3",
			400: "#04979F",
			500: "#024C50",
		},
		dYellow: {
			50:	 "#FFF1AD",
			100: "#FFE45C",
			200: "#FFDD33",
			300: "#FFD600",
			400: "#E0BB00",
			500: "#B89900",
			600: "#8F7700",
			700: "#665500",
		}
  },
	fonts: {
    heading: "Big Shoulders Display",
    body: "Roboto",
  },
};

export default extendTheme(theme);