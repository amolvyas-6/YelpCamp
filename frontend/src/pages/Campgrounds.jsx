import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CampgroundCard from "../components/CampgroundCard";
import tryCatchWrapper from "../utils/tryCatchWrapper";

export default function Campgrounds() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/campground");
      setCampgrounds(response.data);
      setIsLoading(false);
    };
    tryCatchWrapper(getData, navigate);
  }, [navigate]);

  if (isLoading) return <p>Loading Campgrounds</p>;

  return (
    <div className="container">
      <h1>All Campgrounds</h1>
      <Link to="/campground/new">
        <button className="btn btn-primary my-3">Add Campground</button>
      </Link>
      {campgrounds.map((campground) => (
        <CampgroundCard key={campground._id} campgroundData={campground} />
      ))}
    </div>
  );
}
