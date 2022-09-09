import logo from './logo.svg';
import { useState, useRef, useEffect } from 'react';
import './App.css';
import Game from './components/Game';
import Allcountries from './components/filteredCountries';
import HighScores from './components/HighScores';
import darkMan from './assets/black man.png'
import lightMan from './assets/fair man.png'
import darkWoman from './assets/dark woman.png'
import lightWoman from './assets/fair woman.png'
import robot from './assets/robot.png'
import Home from './components/Home'
import Details from './components/Details'
import ReadUp from './components/ReadUp';


function App() {
const [page, setPage] = useState("Home")
const countryArray = Allcountries();

useEffect(()=>{
  if(!localStorage.getItem('Highscore')){
    localStorage.setItem('Highscore', JSON.stringify([{player:'Menuchim', score: 40, avatar:robot}]));
  }
}, [])

function highScoreSize(){
  if(localStorage.getItem('Highscore')){
   let scores = localStorage.getItem('Highscore')
   scores = JSON.parse(scores)
   scores.sort((a, b) => b.score - a.score);
   if(scores.length > 20){
    scores.splice(21)
    localStorage.setItem('Highscore', JSON.stringify(scores));
   }
  }
}
highScoreSize();


  return (
    <>
    <div className='pages'> 
{page === 'Home' && <Home  setPage={setPage}/>}
{page === 'Game' && <Game setPage={setPage} countryArray ={countryArray}/>}
{page === 'Highscores' && <HighScores  setPage={setPage}/>}
{page === 'Details' && <Details setPage={setPage}/>}
{page === 'Read' && <ReadUp  setPage={setPage} countryArray={countryArray}/>}
    </div>
    <footer> <p>&copy; Mesez, 2022 </p></footer>
    </>
    
    
  );
}

export default App;
