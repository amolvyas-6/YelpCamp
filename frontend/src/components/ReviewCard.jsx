import { useAuth } from "../AuthContext";

export default function ReviewCard({ review, number, onDelete }) {
  const { userId } = useAuth();
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Review #{number}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Rating: {review.rating}
        </h6>
        <p className="card-text">{review.text}</p>
        <p className="card-text">Written By: {review.author.username}</p>

        {userId === review.author._id && (
          <button
            className="btn btn-danger"
            onClick={() => onDelete(review._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
