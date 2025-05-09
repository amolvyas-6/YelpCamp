import { useForm } from "react-hook-form";

export default function CampgroundForm({ campground, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: campground,
  });

  const handleFormSubmit = (data, event) => {
    const form = event.target;
    const formData = new FormData(form);
    onSubmit(formData);
  };

  const validations = {
    title: { required: "Title is required" },
    description: {
      maxLength: {
        value: 250,
        message: "The max length can only be 250 characters",
      },
    },
    imageSrc: {
      required: "Image is required",
      pattern: {
        value:
          /^(https?:\/\/)?([\w-])+(\.[\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/,
        message: "Invalid URL",
      },
    },
    price: {
      required: "Price is required",
      min: {
        value: 0,
        message: "Price cannot be negative",
      },
    },
    location: {
      required: "Location is Required",
    },
  };

  return (
    <form className="my-3" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", validations.title)}
          placeholder="Enter Campground Title"
          className="form-control"
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          type="text"
          id="location"
          {...register("location", validations.location)}
          placeholder="Enter Campground Location"
          className="form-control"
        />
        {errors.location && (
          <p className="text-danger">{errors.location.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="imgSrc" className="form-label">
          Images
        </label>
        <input
          type="file"
          id="imgSrc"
          {...register("imageSrc")} //, validations.imageSrc)}
          placeholder="Enter Image URL"
          className="form-control"
          multiple
        />
        {errors.imageSrc && (
          <p className="text-danger">{errors.imageSrc.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            id="price"
            {...register("price", validations.price)}
            placeholder="00"
            className="form-control"
          />
        </div>
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", validations.description)}
          placeholder="Enter Campground Description"
          className="form-control mb-3"
        ></textarea>
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <button className="btn btn-success" type="submit">
        Done
      </button>

      <button className="btn btn-danger mx-3" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
