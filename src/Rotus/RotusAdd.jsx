import Token from "../components/Token";
import SaidbarEnd from "../components/Saidbar/SaidbarEnd";
import { Routes,Route} from "react-router-dom";
import SaidbarOld from "../components/Saidbar/SaidbarOld";
import LikedPage from "../components/Liked/LikedPage";
import Playlist from "../components/Play/Playlist";


 
 const rotus = () => {
   return (
     <div className="d__flex">
       <SaidbarOld className="saidbar__old"/>
        <Routes>
          <Route path="/Token" element={<Token/>} />
          <Route path="/LikedPage" element={<LikedPage/>}/>
          <Route path="/Playlist/:id" element={<Playlist/>} />


          
        </Routes>
        
            
          
       <SaidbarEnd className="saidbar__end"/>
     </div>
   )
 }

 export default rotus