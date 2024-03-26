import React, { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";

const Game: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(6);
  const [feedback, setFeedback] = useState<{ greenLetters: string[], yellowLetters: string[], greyLetters: string[] }>({
    greenLetters: [],
    yellowLetters: [],
    greyLetters: [],
  });

  const loadWords = async (): Promise<void> => {
    try {
      const response = await fetch('/words.txt'); //Extremely rough word set that needs to be cleaned up
      const text = await response.text();
      const words = text.split('\n').map(word => word.trim().toLowerCase()).filter(word => word !== '');
      const randomIndex = Math.floor(Math.random() * words.length);
      setSelectedWord(words[randomIndex]);
    } catch (error) {
      console.error('Failed to load words:', error);
    }
  };

  const selectWord = (): void => {
    loadWords();
  };

  const handleGuess = (): void => {
    let greenLetters: string[] = [];
    let yellowLetters: string[] = [];
    let greyLetters: string[] = [];

    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess.toLowerCase()[i]) {
        greenLetters.push(guess[i]);
      } else if (selectedWord.includes(guess.toLowerCase()[i])) {
        yellowLetters.push(guess[i]);
      } else {
        greyLetters.push(guess[i]);
      }
    }

    setFeedback({ greenLetters, yellowLetters, greyLetters });
    setAttempts(attempts - 1);
  };

  useEffect(() => {
    selectWord();
    const interval: NodeJS.Timeout = setInterval(selectWord, 2 * 60 * 60 * 1000); //Select a new word every 2 hours - I think this only works if you leave the page open?
    return () => clearInterval(interval);
  }, []);

  return ( //need to work on better feedback method - mostly works
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900"> 
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/Designer.jpeg" className="h-8" alt="Jonathan Dean Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Jonathan Dean</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
            </li>
            <li>
              <a href="/posts" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Posts</a>
            </li>
            <li>
              <a href="/wordle" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Wordle</a>
            </li>
            <li>
              <a href="/climbing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Climbing</a>
            </li>
          </ul>
        </div>
      </div>
      </nav>
      <div className="container mx-auto bg-slate-200 rounded-md shadow-md">
        <h1>Guess the 5 Letter Word Game</h1>
        <p>Attempts left: {attempts}</p> 
        <p className="text-4xl font-bold">
          Feedback:{' '} 
          {selectedWord.split('').map((letter, index) => {
            let color;
            if (feedback.greenLetters.includes(letter)) {
              color = 'darkgreen';
            } else if (feedback.yellowLetters.includes(letter)) {
              color = 'gold';
            } else {
              color = 'grey';
            }
            return (
              <span key={index} style={{ color }}>
                {guess[index]}
              </span>
      );
    })}
        </p>
        <input
          type="text"
          value={guess}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuess(e.target.value)}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" placeholder="Guess"
        />
        <button onClick={handleGuess} className="bg-slate-500 hover:bg-slate-800 text-white font-bold py-2 px-4 border border-slate-600 rounded">Guess</button>
        <p>{selectedWord}</p>
      </div>
    </div>
  );
};

export default Game;
