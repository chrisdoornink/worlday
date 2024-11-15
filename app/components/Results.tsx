// components/Results.js
import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

export interface ResultsProps {
  grid: { color: string; value: string }[][];
  time: number;
  onShare: () => void;
}

const Results = ({ grid, time, onShare }: ResultsProps) => (
  <div>
    <Typography variant="h4">Results</Typography>
    <Typography variant="h6">Time Taken: {time} seconds</Typography>
    <Grid container spacing={1}>
      {grid.map((row, rowIndex) => (
        <Grid container item xs={12} key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Grid item xs={1} key={cellIndex} style={{ backgroundColor: cell.color }}>
              <Typography>{cell.value}</Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
    <Button onClick={onShare}>Share Results</Button>
  </div>
);

export default Results;