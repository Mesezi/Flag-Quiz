import { useEffect, useState } from 'react'
import logoIcon from '../assets/flags logo.png'
export default function ReadUp (props){
    const[countries, setCountries] = useState()
useEffect(()=>{
setCountries(props.countryArray.map((country, index)=>{
return(
    <div key={index}>
       <div> <p>{index+1}</p></div>
        <div><p>{country.name}</p></div>
        <img src={`https://flagcdn.com/w320/${country.code}.png`}></img>
    </div>
)
    }))
}, [props.countryArray])
    return(
        <div className='read'>
        <a id="myBtn" href='#top'><i className="fa-solid fa-angles-up"></i></a>
        <header id='top'>
        <nav> 
        <img className='game-icon' src={logoIcon}></img>
        <div>
        <i onClick={()=>{props.setPage('Home')}} className="fa-solid fa-home"></i>
        </div>
        </nav>
    </header>
    <h2 className='read-up-text'>Every country and their respective flag</h2>
    <section className='read-up-container'>
    {countries}
    </section>
 
    </div>
    )
}