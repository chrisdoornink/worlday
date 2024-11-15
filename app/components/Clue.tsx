// components/Clue.js
import React from 'react';
import { Typography } from '@mui/material';

const Clue = ({ clue }: { clue: string }) => <Typography variant="h6">{clue}</Typography>;

export default Clue;