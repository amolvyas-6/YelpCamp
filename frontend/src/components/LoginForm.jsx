import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const validations = {
    username: {
      required: "Username is required",
    },
    password: {
      required: "Password is required",
    },
  };

  const onSubmit = async (data) => {
    console.log(data);
    const response = await axios.post(
      "http://localhost:5000/auth/login",
      data,
      { withCredentials: true }
    );
    if (response.data.statusCode !== 200) {
      alert(response.data.message);
    } else {
      login();
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          {...register("username", validations.username)}
        />
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          {...register("password", validations.password)}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      <button className="btn btn-success">Login</button>
    </form>
  );
}
