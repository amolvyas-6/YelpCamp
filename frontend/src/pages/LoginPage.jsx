import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="container">
      <h1>Welcome Back</h1>
      <p>Please enter your details</p>
      <LoginForm />
      <Link to="/register">Register</Link>
    </div>
  );
}
