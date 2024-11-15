'use client';

import React, { useState, useEffect } from 'react';
import Puzzle from '../components/Puzzle';
import Clue from '../components/Clue';
import Feedback from '../components/Feedback';
import Results from '../components/Results';
import { Container, Typography } from '@mui/material';

const CrossleContainer = () => {
  const [clues, setClues] = useState(['Clue 1', 'Clue 2', 'Clue 3', 'Clue 4']);
  const [words, setWords] = useState(['word1', 'word2', 'word3', 'word4']);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [grid, setGrid] = useState([]);
  
  const handleGuess = (guesses: string[]) => {
    // Handle guessing logic here, including feedback and updating the grid
    setGuesses(guesses);
    // Set end time on completion
    setEndTime(Date.now());
  };

  useEffect(() => {
    // Update grid based on guesses
  }, [guesses]);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Daily Crossword Puzzle
      </Typography>
      {clues.map((clue, index) => (
        <Clue key={index} clue={clue} />
      ))}
      <Puzzle words={words} onGuess={handleGuess} />
      <Feedback feedback={feedback} />
      {endTime && (
        <Results
          grid={grid}
          time={(endTime - startTime) / 1000}
          onShare={() => console.log('Share results')}
        />
      )}
    </Container>
  );
};

export default CrossleContainer;