import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const {
    errorCode = 500,
    errorMessage = "Server is Offline",
    errorStack = "No stack trace for this",
  } = location.state || {};

  return (
    <div className="container alert alert-danger" role="alert">
      <h4 className="alert-heading">
        {errorCode}: {errorMessage}
      </h4>
      <p>{errorStack}</p>
    </div>
  );
}
