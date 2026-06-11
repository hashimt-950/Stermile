import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import MovieDetails from "../pages/MovieDetails";
import Layout from "../components/Layout";
import Watchlist from "../pages/Watchlist";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />

            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
