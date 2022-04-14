import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './mathler.scss';

const Mathler = ({ guessLength }: { guessLength: number }) => {
  const [squareGuesses, setSquareGuesses] = useState<Array<Record<string, string>>>([]);
  const squares = useMemo(() => {
    const squaresArray = [];
    for (let i = 0; i < guessLength; i++) {
      squaresArray.push(
        <button type="button" onClick={() => setSquareGuesses([{ char: '0' }, { char: '0' }, { char: '0' }, { char: '0' }, { char: '0' }, { char: '0' }, { char: '0' }, { char: '0' }])} className="square">
          {squareGuesses[i]?.char || ''}
        </button>,
      );
    }
    return squaresArray;
  }, [guessLength, squareGuesses]);
  return (
    <div className="mathler">
      {squares}
    </div>
  );
};

Mathler.propTypes = {
  guessLength: PropTypes.number.isRequired,
};

export default Mathler;
