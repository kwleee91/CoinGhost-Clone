// import { ReactNode } from "react";
import { ReactNode } from "react";
import Header from "./Header";
import Seo from "./Seo";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <>
      <Seo />
      <div>{props.children}</div>
    </>
  );
}
