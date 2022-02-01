export default function Menu({ set }) {
  return (<div className="menu">
    <div className="menu-item">
      <a href="#" onClick={set.bind(null, "admin")}>MANAGE</a>
    </div>
    <div className="menu-item">
      <a href="#" onClick={set.bind(null, "client")}>SEARCH</a>
    </div>
  </div>);
}