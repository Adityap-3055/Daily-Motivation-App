import * as React from 'react';
import { Button, CircularProgress } from '@mui/material';
import './App.css';
import Heading from './components/heading';
import OpenAI from 'openai';
import Message from './components/message';


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
})

const Params = {
  temperature: 0.5,
  max_tokens: 120,
}

const customStyle = {

  maxWidth: '110px', maxHeight: '40px', minWidth: '120px', minHeight: '40px', backgroundColor: "#0075A4",
}


const buttonOptions = ['study', 'gym', 'food', 'Habits',]

function App() {

  let optype = '';
  const [optionType, setOptionType] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [cbResponse, setCbResponse] = React.useState('');
  // const [flag, setFlag] = React.useState(true);

  // React.useEffect(() => {
  //   if (optionType) {
  //     handleSendData();
  //   }
  // }, [optionType]);

  const handleClick = (el) => {
    console.log('user selected: ', el);
    setOptionType(el)
    optype = el
    handleSendData()
  };

  const handleSendData = async () => {
    // e.preventDefault()
    setIsLoading(true)

    console.log('user select a choice', optionType);
    const prompt = `Give motivation quote on the topic: ${optype} under 64 words, if no topic is given then write :'an error occured'`
    console.log(prompt);
    const endpoint = "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions"
    const body = { ...Params, prompt }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openai.apiKey}`
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    console.log(data);
    setCbResponse(data.choices[0].text)
    setIsLoading(false)
    setOptionType('')
  }

  // const handleClick = (el) =>{
  //   console.log(el);
  // }


  return (
    <div className="section">
      <div className='container'>
        <Heading />
        <div className='box'>


          <div className='buttons'>
            {buttonOptions.map((button, index) => (
              <div key={index}>
                <Button
                  style={customStyle}
                  onClick={() => handleClick(button)}
                  variant="contained"
                >
                  {button}
                </Button>
              </div>
            ))}

          </div>




          <div className='message'>
            <div className='textbox'>
              {isLoading ?
                <CircularProgress />
                :
                cbResponse ? cbResponse : <Message />

              }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
