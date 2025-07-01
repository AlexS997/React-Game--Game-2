import { useState } from 'react'
import './App.css'
import {languages} from './languages'
import {clsx} from 'clsx';
import {getFarewellText, getRandomWord} from './utils'
import Confetti from 'react-confetti'

function App() {

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetter, setGuessedLetter] = useState([])
  
  const wrongGuessCount = guessedLetter.filter(letter => 
    !currentWord.includes(letter)).length
  
  const isGameWon = currentWord.split("").every(letter => guessedLetter.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuess = guessedLetter[guessedLetter.length -1]
  const isIncorrect = lastGuess && !currentWord.includes(lastGuess)

  const letterClicked = (letter) =>{
    setGuessedLetter(prev => 
      prev.includes(letter) ? prev : [...prev, letter]
    )
  }

  const language = languages.map((val, index) => {
    const isLanguageLost = index < wrongGuessCount
    const className = clsx(isLanguageLost && 'lost')

    return (
      <span 
        className={className} 
        key={val.name}
        style={{backgroundColor: val.backgroundColor, color: val.color}}
      >
        {val.name}
      </span>
    )
  })

  const lettersArray = currentWord.split('');
  const lettersAlphabet = alphabet.split('');
  
  const WordLetters = lettersArray.map((val, index) => {
    const revealLetter = isGameLost || guessedLetter.includes(val)
    const letterClassName = clsx(
      isGameLost && !guessedLetter.includes(val) && 'not-guessed'
    )

    return (
      <span key={index} className={letterClassName}>
        {revealLetter ? val.toUpperCase() : ''}
      </span>
    )
  })

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
          disabled={isGameOver}
          aria-disabled={guessedLetter.includes(val)}
          aria-label={`Letter ${val}`}
        >
          {val.toUpperCase()}
        </button>
      )
    }
  )

  const gameClass = clsx('status', {
    lost: isGameLost
  })


  const gameStatus = () => {
    if(!isGameOver && isIncorrect){
      return (
        <p className='frw-msg'>
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      )
    }

    if(isGameWon){
      return(
        <p>
          You win! <br />
          Well done! 👏
        </p>
      )
    } 

    if(isGameLost) {
      return(
        <p>
            Game Over! <br />
            You lose! Better start learning Assembly 😂
        </p>
      )
    }
  }

  const startNewGame = () => {
    setCurrentWord(getRandomWord())
    setGuessedLetter([])
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />
      }
      <header>
        <h1>Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the <br /> 
          programming world safe from Assembly! 
        </p>
      </header>

      <section aria-live='polite' className={gameClass}>
        {gameStatus()}
      </section>

      <section className='languages'>
        {language}
      </section>

      <section className='guess'>
        {WordLetters}
      </section>

      <section className='keyboard'>
        {AlphabetLetters}
      </section>
      {isGameOver && <button className='newGameBtn' onClick={startNewGame}>New Game</button>}
    </main>
  )
}

export default App
