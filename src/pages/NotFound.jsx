import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <p className="lead fs-4">Sorry, we were not able to find the page you were looking for.</p>
      <Link to='/'>Take me back to the LootLab home page</Link>
    </div>
  );
}

export default NotFound;