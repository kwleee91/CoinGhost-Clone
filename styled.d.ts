import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      skyblue: string;
      blue: string;
      lightgray: string;
      darkgray: string;
    };
    btnColors: {
      active: string;
      unactive: string;
    };
  }
}
