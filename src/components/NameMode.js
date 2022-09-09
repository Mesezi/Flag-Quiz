
import { useState, useEffect, useRef, useContext} from 'react';


export default function NameMode(props) {
const pickedOption = useRef('')
const[picked, setPicked] = useState()
const[disableBtn, setdisableBtn] = useState(false)
const[showTick, setShowTick] = useState()

function selectAnswer(option, selected){
setdisableBtn(true)
pickedOption.current = option
setPicked(selected);
if(pickedOption.current === props.correctOption.name){
    props.correct.current.play()
    props.setScore(prev => prev + 1)
}
else{
    props.wrong.current.play()
        props.setHealth(prev => prev - 1)
}
setShowTick(true)

setTimeout(() => {
    setPicked('')
    setShowTick(false)
    setdisableBtn(false)
    props.newQuestion()
}, 1500);

} 
let btnDisable ={
    pointerEvents : disableBtn ? 'none' : 'all'
}



    return(
 
<div className='game-box name'>
        <h2>Who get this flag</h2>
        <img src={`https://flagcdn.com/w320/${props.correctOption.code}.png`}></img>

        <section className="name-options options">
         <button style={btnDisable} className={picked==="A" ? props.A.name === props.correctOption.name ? 'active-correct option-btn' : 'active-option option-btn' :'option-btn'} 
         onClick={()=>selectAnswer(props.A.name, "A")}><p>{props.A.name}</p> {showTick 
         && <span className={props.A.name === pickedOption.current ? '' : props.A.name === props.correctOption.name ? 'green' : 'red' } ></span>}</button>

         <button style={btnDisable} className={picked ==="B" ? props.B.name === props.correctOption.name ? 'active-correct option-btn' : 'active-option option-btn'  : 'option-btn'} 
         onClick={()=>selectAnswer(props.B.name, "B")}><p>{props.B.name}</p> {showTick 
            && <span className={props.B.name === pickedOption.current ? '' : props.B.name === props.correctOption.name ? 'green' : 'red' } ></span>}</button>

         <button style={btnDisable} className={picked==="C" ? props.C.name === props.correctOption.name ? 'active-correct option-btn' : 'active-option option-btn'  : 'option-btn'} 
         onClick={()=>selectAnswer(props.C.name, "C")}><p>{props.C.name}</p> {showTick 
            && <span className={props.C.name === pickedOption.current ? '' : props.C.name === props.correctOption.name ? 'green' : 'red' } ></span>}</button>

         <button style={btnDisable} className={picked==="D" ? props.D.name === props.correctOption.name ? 'active-correct option-btn' : 'active-option option-btn' : 'option-btn'} 
         onClick={()=>selectAnswer(props.D.name, "D")}><p>{props.D.name}</p> {showTick 
            && <span className={props.D.name === pickedOption.current ? '' : props.D.name === props.correctOption.name? 'green' : 'red' } ></span>}</button>
        </section>
       

    </div>
    )

}