import { useState } from 'react'
import './App.css'
import {languages} from './languages'
import {clsx} from 'clsx';

function App() {

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  
  
  const [currentWord, setCurrentWord] = useState('react')
  const [guessedLetter, setGuessedLetter] = useState([])
  
  const wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter))
  console.log(wrongGuessCount)
  
  const letterClicked = (letter) =>{
    setGuessedLetter(prev => 
      prev.includes(letter) ? prev : [...prev, letter]
    )
  }

  const language = languages.map(val => 
    <span key={val.name} 
      style={{backgroundColor: val.backgroundColor, color: val.color}}
    >
      {val.name}
    </span>
  )

  const lettersArray = currentWord.split('');
  const lettersAlphabet = alphabet.split('');
  
  const WordLetters = lettersArray.map((val, index) => 
    <span key={index}>{guessedLetter.includes(val) ? val.toUpperCase() : ''}</span>
  )

  const AlphabetLetters = lettersAlphabet.map(val => {
      const isGuessed = guessedLetter.includes(val)
      const isCorrect = isGuessed && currentWord.includes(val)
      const isWrong = isGuessed && !currentWord.includes(val)
      const className = clsx({
        correct: isCorrect,
        wrong: isWrong
      })

      return (
        <button onClick={() => letterClicked(val)} 
          className={className} key={val}
        >
          {val.toUpperCase()}
        </button>
      )
    }
  )

  return (
    <main>
      <header>
        <h1>Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the <br /> 
          programming world safe from Assembly! 
        </p>
      </header>

      <section className='status'>
        <p>
          You win! <br />
          Well done! 👏
        </p>
      </section>

      <section className='languages'>
        {language}
      </section>

      <section className='quess'>
        {WordLetters}
      </section>

      <section className='keyboard'>
        {AlphabetLetters}
      </section>
        <button className='newGameBtn'>New Game</button>
    </main>
  )
}

export default App
