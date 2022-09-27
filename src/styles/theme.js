const buttons = {
  color: {
    base: "#cdcdcd",
    active: "#ffffff",
    disable: "#cdcdcd",
  },
  border: {
    base: "0.2rem solid #cdcdcd",
    active: "0.2rem solid #393939",
    disable: "0.2rem solid #eeeeee",
  },
  backgroundColor: {
    base: "#ffffff",
    active: "#393939",
    disable: "#eeeeee",
  },
};

const inputs = {
  borderBottom: {
    base: "0.2rem solid #cdcdcd",
    active: "0.2rem solid #9e9e9e",
  },
  padding: {
    base: "1.1rem 0 1rem",
  },
  fontColor: {
    base: "#cdcdcd",
  },
};

const fonts = {
  size: {
    sm: "1rem",
    md: "1.4rem",
    base: "1.5rem",
    lg: "1.8rem",
    title: "2.8rem",
    input: "1.7rem",
    label: "1.3rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const colors = {
  background: "#ffffff",
  dark: "#393939",
  middle: "#9e9e9e",
  light: "#cdcdcd",
  wg: "#eeeeee",
  alert: "#E64A3A",
};

const margins = {
  sm: ".5rem",
  md: "0.5rem",
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
