import Home from "../../assets/img/Home.png"
import Search from "../../assets/img/Search.svg"
import Library from "../../assets/img/Library.svg"
import Librar from "../../assets/img/Librar.svg"
import Liked from "../../assets/img/Liked.svg"
import Line from "../../assets/img/Line.svg"
import Scren from "../../assets/img/Scren.png"
import { Link, NavLink } from "react-router-dom"
const SaidbarOld = () => {
  return (
    <div className='saidbar__old'>
      <div className="home__icon">
        <img src={Home} alt="Home.png" />
        <NavLink to="/Token" className="titel__home navlink">Home</NavLink>
      </div>
      <div className="search  home__icon">
        <img src={Search} alt="Search.svg" />
        <h5 className="titel__home search__text "> Search</h5>
      </div>
      <div className="library home__icon">
        <img src={Library} alt="Library.svg" />
        <h5 className="titel__home library__text">Your Library</h5>
      </div>
      <div className="home__icon librar"><img src={Librar} alt="Librar.svg" />
      <NavLink to="/Playlist" className="titel__home navlink">Create Playlist</NavLink>
      </div>
      <div className="home__icon"><img src={Liked} alt="Liked.svg" />
      <NavLink to="/LikedPage"  className="titel__home navlink" >Liked Songs</NavLink>
      </div>
      <img src={Line} alt="Line.svg" />
      <div className="titel__p">
        <p>Chill Mix</p>
        <p>Insta Hits</p>
        <p>Your Top Songs 2021</p>
        <p>Mellow Songs</p>
        <p>Anime Lofi & Chillhop Music</p>
        <p>BG Afro “Select” Vibes</p>
        <p>Afro “Select” Vibess</p>
        <p>Happy Hits!</p>
        <p>Deep Focus</p>
        <p>Instrumental Study</p>
        <p>OST Compilations</p>
        <p>Nostalgia for old souled mill...</p>
        <p>Mixed Feelings</p>
      </div>
      <img className="scren" src={Scren} alt="Scren.png" />
    </div>
  )
}

export default SaidbarOld