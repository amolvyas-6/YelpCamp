export default function ImageCarousel({ images }) {
  return (
    <div id="carouselExample" class="carousel slide">
      <div className="carousel-indicators">
        {images.map((_, ind) => (
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={ind}
            className={ind == 0 ? "active" : ""}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {images.map((img, ind) => (
          <div
            key={ind}
            className={ind == 0 ? "carousel-item active" : "carousel-item"}
          >
            <img className="d-block w-100" src={img} alt={ind + " image"} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
