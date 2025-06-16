declare module "@splidejs/react-splide" {
  import { ComponentType } from "react";
  import * as React from "react";
  import { Options } from "@splidejs/splide";

  export interface SplideProps {
    children?: React.ReactNode;
    options?: Options;
    [key: string]: unknown;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<{
    children?: React.ReactNode;
    [key: string]: unknown;
  }>;
}
