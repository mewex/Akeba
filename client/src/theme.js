const colorTokens = {
  grey: {
    white: "#FFFFFF",
    lightest: "#F6F6F6",
    light: "#F0F0F0",
    mediumLight: "#E0E0E0",
    medium: "#C2C2C2",
    mediumDark: "#A3A3A3",
    dark: "#858585",
    darker: "#666666",
    darkest: "#4D4D4D",
    black: "#333333",
    darkestGrey: "#1A1A1A",
    almostBlack: "#0A0A0A",
  },
  primary: {
    lightest: "#E6FBFF",
    light: "#CCF7FE",
    mediumLight: "#99EEFD",
    medium: "#66E6FC",
    mediumDark: "#33DDFB",
    dark: "#00D5FA",
    darker: "#00A0BC",
    darkest: "#006B7D",
    almostBlack: "#00353F",
    black: "#001519",
  },
};

const themeSettings = (mode) => {
  const isDarkMode = mode === "dark";
  const primaryColor = isDarkMode ? colorTokens.primary.mediumLight : colorTokens.primary.dark;
  const neutralColor = isDarkMode ? colorTokens.grey.light : colorTokens.grey.medium;
  const backgroundColor = isDarkMode ? colorTokens.grey.darkestGrey : colorTokens.grey.white;

  return {
    palette: {
      mode,
      primary: {
        main: primaryColor,
        dark: isDarkMode ? colorTokens.primary.dark : colorTokens.primary.mediumDark,
        light: isDarkMode ? colorTokens.primary.mediumLight : colorTokens.primary.light,
      },
      neutral: {
        main: neutralColor,
        dark: isDarkMode ? colorTokens.grey.dark : colorTokens.grey.mediumDark,
        medium: isDarkMode ? colorTokens.grey.mediumMain : colorTokens.grey.medium,
        light: isDarkMode ? colorTokens.grey.light : colorTokens.grey.lightest,
      },
      background: {
        default: backgroundColor,
        alt: isDarkMode ? colorTokens.grey.darker : colorTokens.grey.lightest,
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
        },
        h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
        },
        },
        };
        };
