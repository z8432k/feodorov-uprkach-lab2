import { useState } from "react";
import Content from "./Content";
import Header from "./Header";
import Menu from "./Menu";

function Root() {
  const [page, setPage] = useState("client");

  return (<>
    <Header />
    <Menu set={setPage} />
    <Content page={page} />
  </>);
}

export default Root;
