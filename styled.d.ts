import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      size: {
        xxl: string;
        xl: string;
        lg: string;
        ml: string;
        m: string;
        ms: string;
        s: string;
        xs: string;
        xxs: string;
      };
      weight: {
        light: number;
        normal: number;
        bold: number;
      };
      lineHeight: {
        xxlB: string;
        xxl: string;
        xl: string;
        lg: string;
        ml: string;
        mlL: string;
        m: string;
        ms: string;
        msL: string;
        s: string;
        xs: string;
      };
    };
    colors: {
      red: string;
      blue: string;
      sky: string;
      white: string;
      gray: string;
      lightgray: string;
      darkgray: string;
      black: string;
    };
  }
}
