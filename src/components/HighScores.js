import { useState, useEffect, useRef} from 'react';
import Sad from '../assets/sad.png'
import Close from '../assets/so close.png'
import Done from '../assets/you did it.png'
import darkMan from '../assets/black man.png'
import lightMan from '../assets/fair man.png'
import darkWoman from '../assets/dark woman.png'
import lightWoman from '../assets/fair woman.png'
import robot from '../assets/robot.png'
import logoIcon from '../assets/flags logo.png'
import bronze from '../assets/bronze.png'
import gold from '../assets/gold.png'
import silver from '../assets/silver.png'

export default function GameOver (props){
    const [player, setPlayer] = useState('')
    const [highScore, setHighScore] = useState(0)
    const [allHighScores, setAllHighScores] = useState('')
    const [disable, setDisable] = useState(false)
    const [avatar, setAvatar] = useState('')

useEffect(()=>{

if(!localStorage.getItem('Highscore')){
    setAllHighScores(<p>No Top Scores Yet</p>);
}

else{
   let data =localStorage.getItem('Highscore');
data = JSON.parse(data)
data.sort((a, b) => b.score - a.score);

let scoreData = data.map((user, index) => {
    if(index=== 0){
        return(
            <div key={index} className='highscore-card'>
                    <img src={gold}></img>
                    <img src={user.avatar}></img>
                    <p>{user.player}</p>
                    <p>{user.score}</p>
                </div>)
    }
    else if(index === 1){
        return(
            <div key={index} className='highscore-card'>
                    <img src={silver}></img>
                    <img src={user.avatar}></img>
                    <p>{user.player}</p>
                    <p>{user.score}</p>
                </div>)
    }
    else if(index === 2){
        return(
            <div key={index} className='highscore-card'>
                    <img src={bronze}></img>
                    <img src={user.avatar}></img>
                    <p>{user.player}</p>
                    <p>{user.score}</p>
                </div>)
    }
    else{
        return(
            <div key={index} className='highscore-card'>
                    <p>{index + 1}</p>
                    <img src={user.avatar}></img>
                    <p>{user.player}</p>
                    <p>{user.score}</p>
                </div>)
    }
}) 
setAllHighScores(scoreData);
}

}, [])






return(
    <>
    <header>
    <nav> 
    <img className='game-icon' src={logoIcon}></img>
    <div>
    <i onClick={()=>{props.setPage('Home')}} className="fa-solid fa-home"></i>
    </div>
    </nav>
</header>
<h2 className='highscore-text'>HIGH SCORES</h2>
<section className='highscore-container'>
    {allHighScores}
</section>

    </>

)
}