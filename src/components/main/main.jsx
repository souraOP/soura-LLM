import React, { useContext, useState, useEffect } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import Card from './card'

const randomWords = ["Friend", "Nigga", "Nigger", "Homie", "Buddy", "Bitch", "Slave", "Gay", "Gandu", "Pal"];

const Main = () => {

    const [greetings, setGreetings] = useState('Human');

    useEffect(() => {
        const getRandomWords = () => randomWords[Math.floor(Math.random() * randomWords.length)];
        setGreetings(getRandomWords());
    }, []);

    const {onSent, recentPrompt, showResults, loading, resultData, input, setInput} = useContext(Context)


    return (
        <div className='main background-texture'>
            <div className='nav'>
                <p><a href='/' style={{textDecoration: "none", color: "#e3e3e3"}}>Soura-LLM</a></p>
                <img src="https://cdn.statically.io/gh/souraOP/soura-llm-assests/main/user_icon.png" alt='soura'/>
            </div>
            <div className='main-container'>

                 {/* if showResults not true, then return greet and cards, else return results  */}
                {!showResults
                    ?<>
                        <div className='greet-user'>
                            <p>
                                <span>Hello, {greetings}!</span>
                            </p>
                            <p>
                                How can I help you today ?
                            </p>
                        </div>
                    
                        <div className='cards'>
                            <Card name="Help me compare these college majors" image={assets.compass_icon} imgText="compass-icon"/>
                            <Card name="Teach me the concept of game theory in simple terms" image={assets.bulb_icon} imgText="bulb-icon"/>
                            <Card name="Help write SQL to generate a report" image={assets.code_icon} imgText="code-icon"/>
                            <Card name="Create an image & bedtime story" image={assets.message_icon} imgText="message-icon"/>
                        </div>
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img src="https://cdn.statically.io/gh/souraOP/soura-llm-assests/main/user_icon.png" alt='soura'/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt='gemini-icon'/>

                            {/* if loading is true -> response not generated yet thus show loading animation
                                if loading is false -> response is generated, thus show the response i.e p tag
                            */}

                            {loading
                            ?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                            
                        </div>
                    </div>
                }

                
                <div className='main-bottom'>
                    <div className='search-box'>
                        <input type='text' onChange={(e) => setInput(e.target.value)} value={input} placeholder='Message Soura-LLM...' 
                            onKeyDown={(e) => {
                                if(e.key === 'Enter' && input.trim()){
                                    e.preventDefault();
                                    onSent();
                                }
                            }} 
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery-icon" />
                            <img src={assets.mic_icon} alt="mic-icon" />
                            {input?<img onClick={() => onSent()} src={assets.send_icon} alt="send-icon" />:null}
                        </div>
                    </div>
                    <p className='bottom-info'>Soura-LLM can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        </div>
    )
}

export default Main