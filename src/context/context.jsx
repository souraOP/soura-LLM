import { createContext, useState } from "react";
import runChat from "../config/gemini";
import PropTypes from "prop-types";

export const Context = createContext();

const ContextProvider = ({children}) => {

    // to save the input data
    const [input, setInput] = useState("");

    // input data will be saved on this recentPrompt and display on our main component
    const [recentPrompt, setRecentPrompt] = useState("");

    // to store all the input history and display in recent tab
    const [previousPrompt, setPreviousPrompt] = useState([]);

    // once true, it will hide the greet user text and cards boxes and display the result
    const [showResults, setShowResults] = useState(false);

    // if true, shows loading animation and after getting our data it will be false to show the data
    const [loading, setLoading] = useState(false);

    // to display the result on our webpage
    const [resultData, setResultData] = useState([]);

    // for adding typing effect
    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData((prev) => prev + nextWord);
        }, 75*index)
    }

    // implementing new chat function
    const newChat = () => {
        setLoading(false)      // hide the loading animation
        setShowResults(false)  // hide the results and make the greet user text and cards visible
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResults(true)
        let response;
        if(prompt !== undefined) {   // this section will work when we click prompts from the recent section
            response = await runChat(prompt)  // responses will be stored in responses variable
            setRecentPrompt(prompt)
        } else {                    // this section will execute when we type in the input field
            setPreviousPrompt(prev => [...prev, input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        

        // Formatting the response to display in a proper manner
        let responseArray = response.split("**");   // storing the text in split method
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {   // if index is even number -> add a new array
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";  // if index is odd number -> add a bold tag 
            }
        }
        let formattedResponse = newResponse.split("*").join("<br/>");  // replace the * with break tag

        // setResultData(response)  // store the responses in resultData
        let finalResponseArray = formattedResponse.split(" ");

        // loop for traversing the text and applying typing effect
        for (let i = 0; i < finalResponseArray.length; i++) {
            const nextWord = finalResponseArray[i]
            delayPara(i, nextWord + " ");  // calling the function to add typing effect
        }
        setLoading(false)   // hide the loading animation
        setInput("")    // reset the input field and provide empty string
    }

    // providing the state and setter function that we can access in Main and Sidebar components
    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResults,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ContextProvider