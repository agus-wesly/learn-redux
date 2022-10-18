import "../index.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Blog Website</h1>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/posts">
          <li>Create Post</li>
        </Link>
        <Link to="/users">
          <li>Users</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
