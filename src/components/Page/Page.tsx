import React from "react";
import { Footer } from "../Footer/Footer";
import "./page.css";

interface PageProps {
  showFooter: boolean;
  children: JSX.Element;
}

export const Page: React.FC<PageProps> = ({ showFooter, children }) => {
  const myFooter = showFooter ? <Footer></Footer> : null;
  return (
    <section>
      <main>{children}</main>
      {myFooter}
    </section>
  );
};
