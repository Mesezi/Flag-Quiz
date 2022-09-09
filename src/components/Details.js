import { useState } from "react";
import darkMan from '../assets/black man.png'
import lightMan from '../assets/fair man.png'
import darkWoman from '../assets/dark woman.png'
import lightWoman from '../assets/fair woman.png'
import robot from '../assets/robot.png'
import gameLogo from '../assets/flags logo.png'

export default function Home(props) {
const [player, setPlayer] = useState('')
const [currentAvatar,setCurrentAvatar] = useState(darkMan)
const [avatarToggle, setAvatarToggle] = useState(false)

function handleClick (e){
    setPlayer(e.target.value);
}
function startGame(){
    if(player === ''){
        alert('Enter a name, Ode');
    }
    else{
     let data = {player, avatar: currentAvatar}
    data = JSON.stringify(data);
    localStorage.setItem('playerData', data);
    props.setPage('Game');    
    }
   
}
function openAvatar(){
    setAvatarToggle(true)
}

function closeAvatar(avatar){
    setAvatarToggle(false)
    setCurrentAvatar(avatar)
}

    return( 
        <div className="details"> 
   <img className='game-logo' src={gameLogo}></img>
    <h2>Hi, {player}</h2>
    <div> <p className='label' htmlFor="name">Name</p>
 <input type="text" name="name" autocomplete="off" required onChange={(e)=>handleClick(e)}></input> </div>
 <p className='label' htmlFor="avatar">Avatar</p>
 <div className="pick-avatar-container"> 
    <img className="current-avatar avatar-icons" src={currentAvatar} onClick={openAvatar}></img>
   {avatarToggle && <div className="avatars-container">
    <img onClick={()=> closeAvatar(darkMan)} className="avatar-icons" src={darkMan}></img>
    <img  onClick={()=> closeAvatar(lightMan)} className="avatar-icons" src={lightMan}></img>
    <img onClick={()=> closeAvatar(darkWoman)} className="avatar-icons" src={darkWoman}></img>
    <img  onClick={()=> closeAvatar(lightWoman)}className="avatar-icons" src={lightWoman}></img>
    <img  onClick={()=> closeAvatar(robot)}className="avatar-icons" src={robot}></img>
    </div>}
 </div>

 

<button onClick={startGame}>PLAY</button>
    </div>)
}