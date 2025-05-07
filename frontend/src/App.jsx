import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import CampgroundDetail from "./pages/CampgroundDetails";
import AddCampground from "./pages/AddCampground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/campground" element={<Campgrounds />}></Route>
          <Route
            path="/campground/new"
            element={
              <RequireAuth>
                <AddCampground />
              </RequireAuth>
            }
          ></Route>
          <Route path="/campground/:id" element={<CampgroundDetail />}></Route>
          <Route
            path="/error"
            element={
              <RequireAuth>
                <ErrorPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
