const fonts = {
  size: {
    xxl: "40px",
    xl: "26px",
    lg: "20px",
    ml: "18px",
    m: "16px",
    ms: "15px",
    s: "14px",
    xs: "13px",
    xxs: "12px",
  } as const,
  weight: {
    light: 400,
    normal: 500,
    bold: 700,
  } as const,
  lineHeight: {
    xxlB: "36px",
    xxl: "55px",
    xl: "36px",
    lg: "28px",
    ml: "26px",
    mlL: "21.6px",
    m: "24px",
    ms: "22px",
    msL: "25px",
    s: "20px",
    xs: "18px",
  } as const,
};

const colors = {
  red: "#f01a1a",
  blue: "#6f94e9",
  sky: "#c3d4fc",
  white: "#fff",
  gray: "#6f7070",
  lightgray: "#bfbfbf",
  darkgray: "#909090",
  black: "#2b2b2b",
} as const;

const theme = { colors, fonts };

export type Theme = typeof theme;

export default theme;
