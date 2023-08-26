import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';


export default function TextForm() {
  const [text,setText] = useState(" ");

  const onChangeHandler =(event)=>{
    setText(event.target.value)
  }

  const handleUpperCase =()=>{
    let newText = text.toUpperCase();
    setText(newText);
  }
  const handleLowerCase =()=>{
    let newText = text.toLowerCase();
    setText(newText);
  }
  const handleclean =()=>{
    let newText = "";
    setText(newText);
  }

  
  const handleCapitalizeWordClick = () => {
    let lowercase = text.toLowerCase();
    let words = lowercase.split(" ");
    let newWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    let newText = newWords.join(" ");
  setText(newText);
};
const WhiteSpace = () => {
  let updated_text = text.replace(/\s{2,}/g, ' ');
  setText(updated_text);
}

let msg = new SpeechSynthesisUtterance();
const [isSpeaking, setIsSpeaking] = useState(false);
const speak = () => {
  if (!isSpeaking) {
    msg.text = text;
    window.speechSynthesis.speak(msg);
    setIsSpeaking(true);
  }
};

const stopSpeaking = () => {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }
};



  return (
    <div className='container my-3' >
    <div className="mb-3">
        <h3>Enter your text here</h3>
        <textarea className="form-control" value={text} onChange={onChangeHandler} id="exampleFormControlTextarea1" rows="8"></textarea>
        <button type='button' className='btn btn-primary my-3 ' onClick={handleclean}>Clear</button>        
        <button type='button' className='btn btn-primary my-3 mx-3' onClick={handleUpperCase}>Convert to UpperCase</button>        
        <button type='button' className='btn btn-primary my-3 ' onClick={handleLowerCase}>Convert to LowerCase</button>        
        <button type="button" className="btn btn-primary my-3 mx-3" onClick={handleCapitalizeWordClick}>Convert to Capitalized</button>
        <button type="button" className="btn btn-primary my-3 " onClick={WhiteSpace}>Remove Extra Spaces</button>
        <button type="button" className="btn btn-warning my-3 mx-3" onClick={isSpeaking ? stopSpeaking : speak}>
        <FontAwesomeIcon icon={isSpeaking ? faStop : faPlay} /> {isSpeaking ? "Stop" : "Play"}
        </button>


    </div>
    <h4>Text Summary</h4>
    <p>{text.length} Characters and {text.split(" ").length} Words</p>
    <p>{0.04*(text.split(" ").length)} Min to Read</p>
    <h4>Text Preview</h4>{text.length>0?text:"You will get your preview here"}
    </div>
  )
}
