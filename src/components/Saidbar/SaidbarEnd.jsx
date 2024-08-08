import User from "../../assets/img/User.svg";
import Close from "../../assets/img/Close.svg";
import Frame from "../../assets/img/Frame.svg"
import "./Saidbar.css";

const SaidbarEnd = () => {
  return (
    <div className="saidbar__end">
      <div className="let">
        <h5 className="frend">Friend Activity</h5>
        <div className="img__user">
          <img className="user" src={User} alt="User" />
          <img className="user" src={Close} alt="Close" />
        </div>
      </div>
      <div className="lorem">Let friends and followers on Spotify <br/> see what you’re listening to.</div>
      <div>
        <img className="frame" src={Frame} alt="Frame.svg" />
      <img className="frame" src={Frame} alt="Frame.svg" />
      <img className="frame" src={Frame} alt="Frame.svg" />
      </div>
      <div className="text__p">Go to Settings  Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</div>
      <button className="saidbar__btn">SETTINGS</button>
    </div>
  );
};

export default SaidbarEnd;
