import { useState } from "react";
import Admin from "./admin/Admin";
import Client from "./client/Client";

function renderPage(page) {
  switch (page) {
    case 'admin':
      return (<Admin />);
    case 'client':
      return (<Client />);
    default:
      return (<Client />)
  }
}
function Root() {
  const [page, setPage] = useState("client");

  return (<>
    <header>
      <h1>Railways IS.</h1>
    </header>
    <hr />
    <nav>
      <ul>
        <li>
          <a href="#" onClick={setPage.bind(null, "admin")}>Admin</a>
        </li>
        <li>
          <a href="#" onClick={setPage.bind(null, "client")}>Client</a>
        </li>
      </ul>
    </nav>
    <main>
      {renderPage(page)}
    </main>
    <hr />
    <footer>2022 (C) Alex F.</footer>
  </>);
}

export default Root;
