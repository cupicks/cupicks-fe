const buttons = {
  color: {
    base: "#cdcdcd",
    active: "#ffffff",
    disable: "#cdcdcd",
  },
  border: {
    base: "2px solid #cdcdcd",
    active: "2px solid #393939",
    disable: "2px solid #eeeeee",
  },
  backgroundColor: {
    base: "#ffffff",
    active: "#393939",
    disable: "#eeeeee",
  },
};

const inputs = {
  borderBottom: {
    base: "2px solid #cdcdcd",
    active: "2px solid #9e9e9e",
  },
  padding: {
    base: "14px 0 11px",
  },
  fontColor: {
    base: "#cdcdcd",
  },
};

const fonts = {
  size: {
    sm: "1rem",
    base: "1.5rem",
    lg: "1.8rem",
    title: "2.8rem",
    input: "1.7rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const colors = {
  dark: "#393939",
  middle: "#9e9e9e",
  light: "#cdcdcd",
  alert: "#E64A3A",
};

const margins = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const paddings = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const sizes = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1440px",
};

const devices = {
  mobile: `@media only screen and (max-width: ${sizes.mobile})`,
  tablet: `@media only screen and (max-width: ${sizes.tablet})`,
  desktopL: `@media only screen and (max-width: ${sizes.desktop})`,
};

const defaultTheme = {
  margins,
  paddings,
  sizes,
  devices,
  fonts,
  buttons,
  inputs,
  colors,
};
export const lightTheme = { ...defaultTheme };
