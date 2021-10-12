import { theme as defaultTheme, extendTheme } from "@chakra-ui/react"

const theme = {
  ...defaultTheme,
	colors: {
    ...defaultTheme.colors,
		dOrange: {
			100: "#FFD4C2",
			200: "#FF8D5C",
			300: "#f67010",
			400: "#CC3D00",
			500: "#661F00",
		},
		dBlue: {
			50: "#e3fffd",
			100: "#b2f1ed",
			200: "#83dbd6",
			300: "#73bdb9",
			400: "#04979F",
			500: "#024C50",
		},
		dYellow: {
			50:	 "#fffcd2",
			100: "#FFE45C",
			200: "#FFDD33",
			300: "#ffcb01",
			400: "#E0BB00",
			500: "#B89900",
			600: "#8F7700",
			700: "#665500",
		},
		dCream: {
			300: "#F6F5E7",
		}
  },
	fonts: {
    heading: "Big Shoulders Display",
    body: "Roboto",
  },
};

export default extendTheme(theme);