import Admin from "./Admin";
import Client from "./Client";

function render(page) {
  switch (page) {
    case 'admin':
      return (<Admin />);
    case 'client':
      return (<Client />);
    default:
      return (<Client />)
  }
}

export default function Content({ page }) {
  return (<div className="content">
    {render(page)}
  </div>);
}