const buttons = {
  color: {
    light: "#cdcdcd",
    base: "#eeeeee",
    active: "#ffffff",
    disable: "#cdcdcd",
  },
  border: {
    light: "0.2rem solid #cdcdcd",
    base: "0.2rem solid #393939",
    active: "0.2rem solid #333333",
    disable: "0.2rem solid #eeeeee",
  },
  backgroundColor: {
    light: "#ffffff",
    base: "#393939",
    active: "#333333",
    hover: "#cdcdcd",
    disable: "#eeeeee",
  },
};

const inputs = {
  borderBottom: {
    base: "0.2rem solid #cdcdcd",
    active: "0.2rem solid #9e9e9e",
  },
  padding: {
    sm: "1rem 0 0.5rem",
    base: "1.5rem 0 1rem",
  },
  fontColor: {
    base: "#cdcdcd",
  },
};

const fonts = {
  size: {
    sm: "1.1rem",
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

const boxShadows = {
  hover: "3px 3px 8px rgba(0, 0, 0, 0.3)",
  base: "-1px 0px 5px rgba(72, 72, 72, 0.1), 3px 3px 8px rgba(0, 0, 0, 0.1)",
  light: "#cdcdcd",
  wg: "#eeeeee",
  alert: "#E64A3A",
};

const gaps = {
  xs: "0rem",
  sm: "1rem",
  base: "1rem",
  md: "1.2rem",
  lg: "2rem",
};

const flexItems = {
  xs: "1 1 100%",
  sm: "0 0 calc((100% - (1rem * 1)) / 2)",
  base: "0 0 calc((100% - (1rem * 2)) / 3)",
  md: "0 0 calc((100% - (1.2rem * 2)) / 3)",
  lg: "0 0 calc((100% - (1.5rem * 3)) / 4)",
};

const margins = {
  sm: "0.5rem",
  base: "1rem",
  md: "1.2rem",
  lg: "2rem",
};

const paddings = {
  sm: "0 2rem",
  base: "0 2.4rem",
  md: "0 3rem",
  lg: "0 4rem",
};

const sizes = {
  xs: "240px",
  mobile: "360px",
  tablet: "768px",
  desktop: "1440px",
};

const devices = {
  xs: `@media only screen and (max-width: ${sizes.xs})`,
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
  flexItems,
  gaps,
  boxShadows,
};
export const lightTheme = { ...defaultTheme };
