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
    <div class="container mx-auto bg-slate-200 rounded-md shadow-md">
      <h1>Guess the 5 Letter Word Game</h1>
      <p>Attempts left: {attempts}</p> 
      <p>
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
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" placeholder="Guess"
      />
      <button onClick={handleGuess} class="bg-slate-500 hover:bg-slate-800 text-white font-bold py-2 px-4 border border-slate-600 rounded">Guess</button>
      <p>{selectedWord}</p>
    </div>
  );
};

export default Game;
