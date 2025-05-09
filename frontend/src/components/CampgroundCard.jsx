import { Link } from "react-router-dom";

export default function CampgroundCard({ campgroundData }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={campgroundData.imageSrc[0]}
            className="img-fluid w-100 h-100 rounded-start object-fit-cover"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{campgroundData.title}</h3>
            <h4 className="card-subtitle text-secondary fs-5 mb-3">
              {campgroundData.location}
            </h4>
            <p className="card-text">{campgroundData.description}</p>
            <p className="card-text">
              Author: {campgroundData.author.username}
            </p>
            <Link to={`/campground/${campgroundData._id}`}>
              <button className="btn btn-primary">See Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
