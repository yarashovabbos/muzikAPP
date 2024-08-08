import { useEffect, useState } from "react";
import { useFetch } from "../hook/useFetch";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Token.css";
import Footer from "../components/Footer"
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

function Token() {
  const [token, setToken] = useState("");
  const [categoryPlaylists, setCategoryPlaylists] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newCategoryPlaylists, setNewCategoryPlaylists] = useState([]);
  const [extraPlaylists, setExtraPlaylists] = useState([]); // New state for the extra API endpoint

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
              ),
          },
          body: "grant_type=client_credentials",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch token");
        }
        const auth = await res.json();
        const token = `${auth.token_type} ${auth.access_token}`;
        localStorage.setItem("access_token", token);
        setToken(token);
      } catch (error) {
        console.log("Error fetching token: ", error);
      }
    };
    getToken();
  }, []);

  const [data] = useFetch(token ? "/featured-playlists" : null);
  const [typs] = useFetch(token ? "/categories/toplists/playlists" : null);
  const toplists = typs?.playlists?.items.slice(0, 6);
  const playlist = data?.playlists?.items;

  useEffect(() => {
    const fetchCategoryPlaylists = async () => {
      if (token) {
        try {
          const res = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists", {
            headers: {
              Authorization: token,
            },
          });
          if (!res.ok) {
            throw new Error("Failed to fetch category playlists");
          }
          const result = await res.json();
          setCategoryPlaylists(result.playlists.items);
        } catch (error) {
          console.log("Error fetching category playlists: ", error);
        }
      }
    };
    fetchCategoryPlaylists();
  }, [token]);

  useEffect(() => {
    const fetchFeaturedPlaylists = async () => {
      if (token) {
        try {
          const res = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists", {
            headers: {
              Authorization: token,
            },
          });
          if (!res.ok) {
            throw new Error("Failed to fetch featured playlists");
          }
          const result = await res.json();
          setFeaturedPlaylists(result.playlists.items);
        } catch (error) {
          console.log("Error fetching featured playlists: ", error);
        }
      }
    };
    fetchFeaturedPlaylists();
  }, [token]);

  useEffect(() => {
    const fetchNewCategoryPlaylists = async () => {
      if (token) {
        try {
          const res = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists", {
            headers: {
              Authorization: token,
            },
          });
          if (!res.ok) {
            throw new Error("Failed to fetch new category playlists");
          }
          const result = await res.json();
          setNewCategoryPlaylists(result.playlists.items);
        } catch (error) {
          console.log("Error fetching new category playlists: ", error);
        }
      }
    };
    fetchNewCategoryPlaylists();
  }, [token]);

  useEffect(() => {
    const fetchExtraPlaylists = async () => {
      if (token) {
        try {
          const res = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists", {
            headers: {
              Authorization: token,
            },
          });
          if (!res.ok) {
            throw new Error("Failed to fetch extra playlists");
          }
          const result = await res.json();
          setExtraPlaylists(result.playlists.items);
        } catch (error) {
          console.log("Error fetching extra playlists: ", error);
        }
      }
    };
    fetchExtraPlaylists();
  }, [token]);

  const handleCardClick = (id) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div className="Home">
      <div className="tokin__rout">
        {token ? (
          <div className="ad__tokin">
            <div className="arrow">
              <IoIosArrowDropleftCircle className="path" />
              <IoIosArrowDroprightCircle className="path" />
            </div>

            <h1 className="good">Good afternoon</h1>
            <div className="topplist">
              {toplists &&
                toplists.map((item) => (
                  <div key={item.id} className="top">
                    <img src={item.images[0].url} alt={item.name} />
                    <div className="img__name">{item.name}</div>
                  </div>
                ))}
            </div>
            <div className="playlist-container">
              <div className="titel__your">
                <h2>Your top mixes</h2>
                <p>SEE ALL</p>
              </div>
              <div className="playlist-row">
                {playlist &&
                  playlist.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="playlist-card"
                      onClick={() => handleCardClick(item.id)} // Add onClick event
                    >
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="playlist-image"
                      />
                      <div className="playlist-info">
                        <div className="playlist-name">{item.name}</div>
                        <div className="playlist-description">{item.description}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="category-playlists">
              <div className="titel__your">
                <h2>Category Playlists</h2>
                <p>SEE ALL</p>
              </div>
              <div className="playlist-row">
                {categoryPlaylists &&
                  categoryPlaylists.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="playlist-card"
                      onClick={() => handleCardClick(item.id)} // Add onClick event
                    >
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="playlist-image"
                      />
                      <div className="playlist-info">
                        <div className="playlist-name">{item.name}</div>
                        <div className="playlist-description">{item.description}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="featured-playlists">
              <div className="titel__your">
                <h2>Recently played</h2>
                <p>SEE ALL</p>
              </div>
              <div className="playlist-row">
                {featuredPlaylists &&
                  featuredPlaylists.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="playlist-card"
                      onClick={() => handleCardClick(item.id)} // Add onClick event
                    >
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="playlist-image"
                      />
                      <div className="playlist-info">
                        <div className="playlist-name">{item.name}</div>
                        <div className="playlist-description">{item.description}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="new-category-playlists">
              <div className="titel__your">
                <h2>Jump back in</h2>
                <p>SEE ALL</p>
              </div>
              <div className="playlist-row">
                {newCategoryPlaylists &&
                  newCategoryPlaylists.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="playlist-card"
                      onClick={() => handleCardClick(item.id)} // Add onClick event
                    >
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="playlist-image"
                      />
                      <div className="playlist-info">
                        <div className="playlist-name">{item.name}</div>
                        <div className="playlist-description">{item.description}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="extra-playlists">
              <div className="titel__your">
                <h2>Uniquely yours</h2>
                <p>SEE ALL</p>
              </div>
              <div className="playlist-row">
                {extraPlaylists &&
                  extraPlaylists.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="playlist-card"
                      onClick={() => handleCardClick(item.id)} // Add onClick event
                    >
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="playlist-image"
                      />
                      <div className="playlist-info">
                        <div className="playlist-name">{item.name}</div>
                        <div className="playlist-description">{item.description}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="footer">
      <div className="App">
      <Footer  src="path/to/your/audiofile.mp3" type="audio/mpeg" />
          
      
    </div>
      </div>
    </div>
  );
}

export default Token;
