import React, { useEffect, useState } from 'react';
import './Mix.css'; 

const Mix = () => {
  const [playlists, setPlaylists] = useState([]);
  const [token, setToken] = useState('');

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
                `${import.meta.env.VITE_CLIENT_ID}:${
                  import.meta.env.VITE_CLIENT_SECRET
                }`
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

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch playlists');
        }
        const data = await res.json();
        setPlaylists(data.playlists.items.slice(0, 4)); // Limit to 4 playlists
      } catch (error) {
        console.log('Error fetching playlists: ', error);
      }
    };
    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  return (
    <div className="mix-container">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlist-card">
          <img src={playlist.images[0].url} alt={playlist.name} className="playlist-image" />
          <div className="playlist-info">
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mix;
