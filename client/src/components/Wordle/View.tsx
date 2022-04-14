import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './wordle.scss';

const Wordle = ({ guessLength = 5, maxGuesses = 6, actions, guesses }:
  { guessLength?: number, maxGuesses?: number, actions: any, guesses: any[] }) => {
  const initialGuesses = useMemo(() => new Array(maxGuesses).fill([]), [maxGuesses]);
  const [squareGuesses, setSquareGuesses] = useState<Array<Array<string>>>(initialGuesses);
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const squares = useMemo(() => {
    const guessesArray = [];
    for (let i = 0; i < maxGuesses; i++) {
      const squaresArray = [];
      for (let j = 0; j < guessLength; j++) {
        squaresArray.push(
          <div className={`square ${guesses?.[i]?.[j].color}`}>
            {squareGuesses[i][j] || ''}
          </div>,
        );
      };
      guessesArray.push(<div className="squares">{squaresArray}</div>);
    }
    return guessesArray;
  }, [guessLength, squareGuesses, maxGuesses, guesses]);
  const handleKeyDown: any = useCallback((event: KeyboardEvent) => {
    if (currentGuess >= maxGuesses) return;
    console.log(currentGuess, maxGuesses);
    const { key } = event;
    if (key === 'Enter') {
      actions.guessWordle(squareGuesses[currentGuess].join(''));
      setCurrentGuess((oldCurrentGuess) => oldCurrentGuess + 1);
    }
    if (key === 'Backspace') {
      setSquareGuesses((oldSquareGuesses) => {
        const currentGuessArr = [...oldSquareGuesses[currentGuess]];
        if (currentGuessArr.length) currentGuessArr.pop();
        return [...oldSquareGuesses.slice(0, currentGuess), currentGuessArr, ...oldSquareGuesses.slice(currentGuess + 1, maxGuesses)];
      });
    }
    if (key.length === 1 && /^[a-zA-Z]+$/.test(key.toLowerCase())) {
      setSquareGuesses((oldSquareGuesses) => {
        const currentGuessArr = [...oldSquareGuesses[currentGuess]];
        if (currentGuessArr.length < guessLength) currentGuessArr.push(key.toLowerCase());
        return [...oldSquareGuesses.slice(0, currentGuess), currentGuessArr, ...oldSquareGuesses.slice(currentGuess + 1, maxGuesses)];
      });
    }
  }, [setSquareGuesses, actions, currentGuess, setCurrentGuess, guessLength, maxGuesses, squareGuesses]);
  useEffect(() => {
    actions.startWordle();
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  return (
    <div className="wordle">
      {squares}
    </div>
  );
};

Wordle.propTypes = {
  guessLength: PropTypes.number.isRequired,
};

export default Wordle;
