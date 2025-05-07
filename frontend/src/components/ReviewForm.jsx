import { useForm } from "react-hook-form";

export default function ReviewForm({ onSubmit }) {
  const validations = {
    text: {
      required: "Review Text cannot be Empty",
      maxLength: {
        value: 250,
        msg: "Max Length of review is 250 characters",
      },
    },
    rating: {
      required: "Rating is required",
    },
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const ratingValue = watch("rating");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="mb-3"
    >
      <h3>Review Form</h3>
      <div className="mb-3">
        <label htmlFor="rating-text" className="form-label">
          Review Text
        </label>
        <textarea
          name="text"
          id="rating-text"
          {...register("text", validations.text)}
          className="form-control"
        ></textarea>
        {errors.text && (
          <p className="text-danger mt-2">{errors.text.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating: {ratingValue}
        </label>
        <input
          type="range"
          min={1}
          max={5}
          id="rating"
          name="rating"
          className="form-range"
          {...register("rating", validations.rating)}
        />
      </div>

      <button className="btn btn-success">Submit</button>
    </form>
  );
}
