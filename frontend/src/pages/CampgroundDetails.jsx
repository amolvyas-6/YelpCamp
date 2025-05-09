import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CampgroundForm from "../components/CampgroundForm";
import tryCatchWrapper from "../utils/tryCatchWrapper";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import { useAuth } from "../AuthContext";
import ImageCarousel from "../components/ImageCarousel";

export default function CampgroundDetail() {
  const { id } = useParams();
  const [campground, setCampground] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [reviewRefresh, setReviewRefresh] = useState(false);
  const { isLoggedIn, userId } = useAuth();

  const deleteCampground = async () => {
    const deleteFunction = async () => {
      await axios.delete("http://localhost:5000/campground/" + campground._id, {
        withCredentials: true,
      });
      navigate("/campground");
    };
    tryCatchWrapper(deleteFunction, navigate);
  };

  const submitReview = (data) => {
    const postReview = async () => {
      data["author"] = userId;
      await axios.post(
        "http://localhost:5000/campground/" + campground._id + "/review",
        data,
        { withCredentials: true }
      );
      setReviewRefresh((old) => !old);
    };
    tryCatchWrapper(postReview, navigate);
  };

  const startEditing = () => {
    if (id) {
      setIsEditing(true);
    } else {
      alert("not a valid campground");
    }
  };

  const completeEditing = async (campground) => {
    const patchCampground = async () => {
      campground["author"] = userId;
      await axios.patch("http://localhost:5000/campground/" + id, campground, {
        withCredentials: true,
      });
      setIsEditing(false);
    };
    tryCatchWrapper(patchCampground, navigate);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const getCampground = async () => {
      const response = await axios.get(
        "http://localhost:5000/campground/" + id
      );
      setCampground(response.data);
      setIsLoading(false);
    };
    tryCatchWrapper(getCampground, navigate);
  }, [id, isEditing, navigate]);

  if (isEditing) {
    return (
      <div className="container">
        <h1>Edit Campground</h1>
        <CampgroundForm
          campground={campground}
          onSubmit={completeEditing}
          onCancel={cancelEditing}
        />
      </div>
    );
  }

  if (isLoading) return <p>Campground Data is Loading</p>;

  return (
    <>
      <div className="row my-3 px-3">
        <div className="col-6 m-auto">
          <div className="card">
            <ImageCarousel images={campground.imageSrc} />
            <div className="card-body">
              <h5 className="card-title">{campground.title}</h5>
              <p className="card-text">{campground.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price: {campground.price}</li>
              <li className="list-group-item">
                Location: {campground.location}
              </li>
              <li className="list-group-item">
                Author: {campground.author.username}
              </li>
            </ul>
            {isLoggedIn && userId === campground.author._id && (
              <div className="card-body">
                <button className="btn btn-danger" onClick={deleteCampground}>
                  Delete
                </button>
                <button className="btn btn-primary mx-3" onClick={startEditing}>
                  Edit Campground
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-6 mx-auto" style={{ maxHeight: "80vh" }}>
          <ReviewForm onSubmit={submitReview} />
          <div className="overflow-auto" style={{ maxHeight: "50vh" }}>
            <ReviewList
              id={id}
              reviewRefresh={reviewRefresh}
              setReviewRefresh={setReviewRefresh}
            />
          </div>
        </div>
      </div>
    </>
  );
}
