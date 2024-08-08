import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fra from "../../assets/img/Fra.svg"
import "./Playlist.css";
import Fram from "../../assets/img/Fram.svg"
import Group from "../../assets/img/Group.svg"
import { FaHeart } from "react-icons/fa"; // Like icon uchun react-icons kutubxonasini ishlatamiz
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch playlist");
        }
        const result = await res.json();
        setPlaylist(result);
        setTracks(result.tracks.items);
      } catch (error) {
        console.log("Error fetching playlist: ", error);
      }
    };
    fetchPlaylist();
  }, [id]);

  const playAudio = (audioElement) => {
    if (audioElement) {
      audioElement.play();
    }
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="playlist">
      {playlist ? (
        <div>
           <div className="arrow">
              <IoIosArrowDropleftCircle className="path" />
              <IoIosArrowDroprightCircle className="path" />
            </div>
          <h1>{playlist.name}</h1>
          <img src={playlist.images[0].url} alt={playlist.name} className="playlist-image" />
          <div className="playlist-description">{playlist.description}</div>
          <div className="tracks">
            <h2>Tracks</h2>
            <ul>
              <div className="fra__group"><img src={Group} alt="Group.svg" /><img src={Fra} alt="Fra.svg" /></div>
              <img className="Fram" src={Fram} alt="Fram.svg" />
              {tracks.map((track) => (
                
                <li key={track.track.id} className="track-item" onClick={(e) => playAudio(e.currentTarget.querySelector('audio'))}>
                  <img src={track.track.album.images[0].url} alt={track.track.name} className="track-image" />
                  <div className="track-info">
                    <p>{track.track.name}</p>
                    <audio>
                      <source src={track.track.preview_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <FaHeart className="like-icon" />
                  <span className="track-duration">{formatDuration(track.track.duration_ms)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Playlist;
