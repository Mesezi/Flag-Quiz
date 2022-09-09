import { useState } from 'react'
import gameLogo from '../assets/flags logo.png'
export default function Home(props){
    const[clearDataPop, setClearDataPop] = useState(false)

    function clearData(){
        window.localStorage.clear();
        setClearDataPop(false)
    }


    return(<>
    {clearDataPop && <div className='menu'>
     <div className='menu-box home-prompt'>
        <h2>Are you sure ? <br></br> All game data will be cleared</h2>
        <div> 
           <button onClick={clearData}>Yes</button> 
           <button onClick={()=>{setClearDataPop(false)}}>No</button>
        </div>
        
     </div> </div>}

    <div className="home">
<img className='game-logo' src={gameLogo}></img>
<p className='description'>How good is your Geography? <br></br>
Challenge yourself with this flags quiz game, with over 200 world flags. <br></br>
</p>
<hr></hr>
<p>Test your knowledge, train your brain and try to beat my high score!</p>
<button onClick={()=>props.setPage('Details')}>Get started</button>
<span onClick={()=>{props.setPage('Highscores')}} className='underline'>Highscores</span>
<span onClick={()=>{props.setPage('Read')}} className='underline'>Read up</span>
<span onClick={()=>{setClearDataPop(true)}} className='underline'>Clear Game data</span>

    </div>
    </>)
}