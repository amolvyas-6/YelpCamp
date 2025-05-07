import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Link to="/login">
      <button className="btn btn-primary mx-3">Login</button>
    </Link>
  );
}
