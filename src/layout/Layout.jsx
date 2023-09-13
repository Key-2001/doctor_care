import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import { Fragment } from "react";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
