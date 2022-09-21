import React from "react";
import { Footer } from "../Footer/Footer";
import "./page.css";

interface PageProps {
  showFooter: boolean;
  children: JSX.Element;
  setLogout?: () => void;
}

export const Page: React.FC<PageProps> = ({
  showFooter,
  children,
  setLogout,
}) => {
  const myFooter = showFooter ? <Footer setLogout={setLogout}></Footer> : null;
  return (
    <section>
      <main>{children}</main>
      {myFooter}
    </section>
  );
};
