import axios from "axios";
import CampgroundForm from "../components/CampgroundForm";
import { useNavigate, Link } from "react-router-dom";
import tryCatchWrapper from "../utils/tryCatchWrapper";
import { useAuth } from "../AuthContext";

export default function AddCampground() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const addCampground = async (campground) => {
    campground["author"] = userId;
    console.log(campground);
    const postCampground = async () => {
      await axios.post("http://localhost:5000/campground", campground, {
        withCredentials: true,
      });
      navigate("/campground");
    };
    tryCatchWrapper(postCampground, navigate);
  };
  const cancelAdding = () => {
    navigate("/campground");
  };

  return (
    <div className="container">
      <h1>Add New Campground</h1>
      <CampgroundForm
        campground={{}}
        onSubmit={addCampground}
        onCancel={cancelAdding}
      />
    </div>
  );
}
