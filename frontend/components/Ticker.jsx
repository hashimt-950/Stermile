import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Ticker() {
  const [titles, setTitles] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getTitles = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/movies/topRated",
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await response.json();
        const results = data.results || [];
        const shuffled = [...results].sort(() => Math.random() - 0.5);
        setTitles(shuffled.slice(0, 14).map((m) => m.title));
      } catch (error) {
        console.log("error fetching ticker titles: ", error.message);
      }
    };

    getTitles();
  }, []);

  if (titles.length === 0) return null;

  const doubled = [...titles, ...titles];

  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className={i % 4 === 0 ? "ticker-hi" : ""}>{t}</span>
            <span className="ticker-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ticker;
