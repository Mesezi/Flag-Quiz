import { useState, useEffect, useRef, useContext} from 'react';
import logoIcon from '../assets/flags logo.png'


export default function GameNavbar(props) {

return(<header>
    <nav> 
    <img className='game-icon' src={logoIcon}></img>
    <div>
    <i onClick={props.homeBtn} className="fa-solid fa-home"></i>
      <i onClick={props.stop} className="fa-solid fa-pause"></i>
    </div>
    </nav>
</header>)
}