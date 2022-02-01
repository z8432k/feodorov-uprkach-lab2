import Manage from "./Manage";
import Client from "./Client";

function render(page) {
  switch (page) {
    case 'admin':
      return (<Manage />);
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
