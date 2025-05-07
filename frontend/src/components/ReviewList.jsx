import { useState, useEffect } from "react";
import tryCatchWrapper from "../utils/tryCatchWrapper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ id, reviewRefresh, setReviewRefresh }) {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const onDelete = async (reviewId) => {
    tryCatchWrapper(async () => {
      await axios.delete(
        "http://localhost:5000/campground/" + id + "/review/" + reviewId
      );
      setReviewRefresh((old) => !old);
    }, navigate);
  };

  useEffect(() => {
    tryCatchWrapper(async () => {
      const response = await axios.get(
        "http://localhost:5000/campground/" + id + "/review"
      );
      setIsLoading(false);
      setReviews(response.data);
    }, navigate);
  }, [id, navigate, reviewRefresh]);

  if (isLoading) return <p className="col-6 m-auto">Reviews are Loading</p>;

  return (
    <div>
      {reviews.map((review, ind) => (
        <ReviewCard
          key={ind}
          review={review}
          number={ind + 1}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
