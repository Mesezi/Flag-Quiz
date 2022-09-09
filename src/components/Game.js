
import { useState, useEffect, useRef, createContext, useMemo} from 'react';
import NameMode from './NameMode';
import FlagMode from './FlagMode';
import GameOver from './GameOver';
import GameNavbar from './GameNavbar';
import darkMan from '../assets/black man.png'
import lightMan from '../assets/fair man.png'
import darkWoman from '../assets/dark woman.png'
import lightWoman from '../assets/fair woman.png'
import robot from '../assets/robot.png'
import wrongAudio from '../assets/wrong.mp3'
import correctAudio from '../assets/correct.wav'
import heartBeat from '../assets/heartbeat.mp3'
import newHighScore from '../assets/highscore.mp3'
import gameOver from '../assets/game over.mp3'

export const pickedOptionContext = createContext() 

export default function Game (props){
    const[pickedOption, setPickedOption] = useState('') //Player selected option
    const[question, setQuestion] = useState('') // question to be displayed
    const[score, setScore] = useState(0)// player score
    const[timer, setTimer] = useState(20)// game timer
    const[health, setHealth] = useState(5)// player health
    const [intervalId, setIntervalId] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const [homePrompt, setHomePrompt] = useState(false);
    const[displayGameOver, setDisplayGameOver] = useState(false)
    const [player, setPlayer] = useState(false);
    const [highScore, setHighScore] = useState('')

    const A = useRef('') // option A
    const B = useRef('') // option B
    const C = useRef('')// option C
    const D = useRef('')// option D
    const correctOption = useRef('') // correct option
    const wrong = useRef()
    const correct = useRef()
    const heartAudio = useRef()
    const newHighScoreAudio = useRef()
    const gameOverAudio = useRef()


useEffect(()=>{
    if(!localStorage.getItem('Highscore')){
        localStorage.setItem('Highscore', JSON.stringify([]));
      }
        let data =localStorage.getItem('Highscore');
        data = JSON.parse(data)
        data.sort((a, b) => b.score - a.score);
        setHighScore(data[0].score)
}, [displayGameOver])

useEffect(()=>{
    if(typeof highScore === 'number'){
        if(score >= highScore){
            setHighScore(score)
            newHighScoreAudio.current.play()
        }
    }
 
    }, [score])

    useEffect(()=>{
        let playerData = localStorage.getItem('playerData')
        playerData = JSON.parse(playerData)
        setPlayer(playerData)
    }, [])

    const start = () => {
      const newIntervalId = setInterval(() => {
        setTimer(prevCount => prevCount - 1);
      }, 1000);
      setIntervalId(newIntervalId);

setOpenMenu(false)

}

const stop = ()=>{
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
setOpenMenu(true)        
}     
}

const homeBtn = () =>{
    setHomePrompt(prev => !prev)
    if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        setHomePrompt(true)     
}  
}

const noHomeBtn = () => {
    const newIntervalId = setInterval(() => {
        setTimer(prevCount => prevCount - 1);
      }, 1000);
      setIntervalId(newIntervalId);
      setHomePrompt(false)  
}
       


useEffect(()=>{
    if(timer < 1){
        setHealth(prev => prev -1)
        newQuestion();
       }
}, [timer])

useEffect(()=>{
    if(health < 1){
            clearInterval(intervalId);
            setIntervalId(0);
setTimeout(() => {
        setDisplayGameOver(true)
    }, 1000);  
    }
}, [health])


if(health === 1){
    heartAudio.current.play()
}

function newGame(){
    setDisplayGameOver(false)
    setTimer(20)
    setHealth(5)
    setScore(0)
    start()
  newQuestion();
}

function newQuestion(){
    setTimer(20)
    // create an array that contains 4 unique random numbers
    let arr = [];
    while(arr.length < 4){
    var r = Math.floor(Math.random() * props.countryArray.length);
    if(arr.indexOf(r) === -1)// if indexOf r is equal to -1 means the number doesn't exist in the array, therefore push r into the r
     arr.push(r);
}
let gameType = ['name', 'flag'] // game types
    let randomOptions = arr[Math.floor(Math.random() * 4)] // randomly pick an option as correct option from the array arr
    let randomType = gameType[Math.floor(Math.random() * 2)] // randomly pick a game type
    
    // set random numbers in array, to options A-D
   A.current = props.countryArray[arr[0]]
   B.current =props.countryArray[arr[1]]
   C.current =props.countryArray[arr[2]]
   D.current =props.countryArray[arr[3]]
   // using the randomOptions, select any option as the correct option
   correctOption.current = props.countryArray[randomOptions];
// pass randomType  as parameter into createQuestion Function
    createQuestion(randomType);
}


// random game type
function createQuestion(type){
    if(type === 'name'){
         setQuestion(<NameMode A={A.current} B={B.current} C={C.current} D={D.current}
        correctOption={correctOption.current} setPickedOption={setPickedOption} newQuestion={newQuestion} 
        setScore={setScore} setHealth={setHealth} health={health}  setTimer={setTimer}
        wrong={wrong} correct={correct}/>) // set NameMode compnent as question
    }
    else if (type === 'flag'){
        setQuestion(<FlagMode A={A.current} B={B.current} C={C.current} D={D.current} 
        correctOption={correctOption.current}  setPickedOption={setPickedOption} newQuestion={newQuestion} 
        setScore={setScore} setHealth={setHealth} health={health} setTimer={setTimer}
         wrong={wrong} correct={correct}/>) //set FlagMode compnent as question
    }
}

 // time bar
let progress = {
    height: '.35rem',
    width : `${timer * 5}%`,
    backgroundColor : timer < 11 ? 'red' : 'green',
    transition : 'all ease-in-out 300ms',
    margin : '.2rem 0',
}
// beating heart animation
let iconStyle ={
    animation: health < 2 ? 'beat .45s infinite alternate' : '',
	transformOrigin: 'center'
}

// Heart icons 
let icons =[]
let healthIcons = ()=>{
     for(let i =0; i < health; i++){
        icons.push(<i style={iconStyle} className="fa-solid fa-heart" key={i}></i>)
     }
}
healthIcons();

useMemo(()=>{
    newGame();
}, [])

return (
 <div>

 <audio ref={wrong}>
 <source  src={wrongAudio} type="audio/mpeg"></source>
</audio>
<audio  ref={correct}>
 <source src={correctAudio} type="audio/mpeg"></source>
</audio>

<audio ref={heartAudio} >
 <source src={heartBeat} type="audio/mpeg"></source>
</audio>

<audio ref={newHighScoreAudio} >
 <source src={newHighScore} type="audio/mpeg"></source>
</audio>

<audio ref={gameOverAudio} >
 <source src={gameOver} type="audio/mpeg"></source>
</audio>


    {!displayGameOver && 
    
    <>
    {homePrompt && <div className='menu'>
     <div className='menu-box home-prompt'>
        <h2>Are you sure ? <br></br> You will lose your progress</h2>
        <div> 
           <button onClick={()=>props.setPage('Home')}>Yes</button> 
           <button onClick={noHomeBtn}>No</button>
        </div>
        
     </div> </div>}

    {openMenu && <div className='menu'>
     <div className='menu-box'>
        <h2>Paused</h2>
<i onClick={start} className="fa-solid fa-play play"></i>
     </div> </div>} 
    <GameNavbar stop={stop} openMenu={openMenu} homeBtn={homeBtn}/>

{timer}
<div className='progress-con'><p style={progress} className='progress'></p></div>

    
     <div className='content'>
<section className='highscore--health'>
    <div className='player--health'>
    <img className="avatar-icons" src={player.avatar}></img>
    <div className='health'>{icons}</div></div>
    <p>High Score: <span>{highScore}</span></p>
</section> 
<hr></hr> 
<p className='score'>{score}</p>
<section  className='game-container'>
    {question}
</section>

    
    </div></>
    
    
    
   }

 {displayGameOver && <GameOver score ={score} 
 newGame={newGame} setPage={props.setPage} 
 stop={stop} heartAudio={heartAudio} gameOverAudio={gameOverAudio} newHighScoreAudio={newHighScoreAudio}/>}  </div>


)

}

