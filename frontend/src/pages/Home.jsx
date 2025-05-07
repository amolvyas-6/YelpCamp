import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to YelpCamp!!</h1>
      <Link to="/campground">
        <button className="btn btn-primary">View All Campgrounds</button>
      </Link>
    </div>
  );
}
