// components/Puzzle.js
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';

export interface PuzzleProps {
  words: string[];
  onGuess: (guesses: string[]) => void;
}

const Puzzle = ({ words, onGuess }: PuzzleProps) => {
  const [guesses, setGuesses] = useState(Array(words.length).fill(''));

  const handleGuess = (index: number, value: string) => {
    const newGuesses = [...guesses];
    newGuesses[index] = value;
    setGuesses(newGuesses);
  };

  return (
    <Grid container spacing={2}>
      {words.map((word, index) => (
        <Grid item xs={3} key={index}>
          <TextField
            label={`Word ${index + 1}`}
            variant="outlined"
            value={guesses[index]}
            onChange={(e) => handleGuess(index, e.target.value)}
            fullWidth
          />
        </Grid>
      ))}
      <Button onClick={() => onGuess(guesses)}>Submit Guesses</Button>
    </Grid>
  );
};

export default Puzzle;