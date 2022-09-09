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

export default function GameOver (props){
    const [player, setPlayer] = useState('')
    const [gameOverhighScore, setGameOverhighScore] = useState(0)
    const [emoji, setEmoji] = useState('')
    const [disable, setDisable] = useState(false)
    const [avatar, setAvatar] = useState('')

props.heartAudio.current.pause()
useEffect(()=>{
let data =localStorage.getItem('Highscore');
data = JSON.parse(data)

if(!data.length < 1){
    data.sort((a, b) => b.score - a.score);
    setGameOverhighScore(data[0].score)
    if(props.score > data[0].score){
        setEmoji(<div>
            <img className='emoji' src={Done}></img>
            <p>NEW HIGHSCORE</p>
        </div>)
        setGameOverhighScore(props.score)
         props.newHighScoreAudio.current.play()
    }
    else if(props.score >= data[0].score - 10){
        setEmoji(<div>
            <img className='emoji' src={Close}></img>
            <p>So Close</p>
        </div>)
        props.gameOverAudio.current.play()
    } 
    else{
        setEmoji(<div>
            <img className='emoji' src={Sad}></img>
            <p>Try Again, Boss</p>
        </div>)
         props.gameOverAudio.current.play()
    }
}

let playerData = localStorage.getItem('playerData');
playerData = JSON.parse(playerData)
setPlayer(playerData.player)
setAvatar(playerData.avatar)
}, [])

function handleClick (e){
    setPlayer(e.target.value);
}


function save(){
    if(player === ''){
        alert("What's your problem?, Enter a name")
    }
    else{
        let newScore = {player, score: props.score, avatar}
        let data =localStorage.getItem('Highscore');
        data = JSON.parse(data)
        data = [...data, newScore]
        data = JSON.stringify(data)
        localStorage.setItem('Highscore', data);
        setDisable(true)
    }
}


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
    <div className='game-over'>
<section>
<h1>Game Over</h1>
<div className='game-over-score'><img className="avatar-icons" src={avatar}></img> <h2>{props.score}</h2> </div>

<p>High Score : {gameOverhighScore}</p>
{emoji}
 </section>


<section>
    <input type="text" name="name" value={player} autocomplete="off" required onChange={(e)=>handleClick(e)}></input>
 {!disable && <button onClick={save}>SAVE SCORE</button>}
 <button onClick={props.newGame}>PLAY AGAIN</button>
 <span onClick={()=>{props.setPage('Highscores')}} className='underline'>Highscores</span>
 </section>
 </div>

    </>

)
}