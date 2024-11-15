// components/Feedback.js
import React from 'react';
import { Typography } from '@mui/material';

const Feedback = ({ feedback }: { feedback: string }) => <Typography variant="body1">{feedback}</Typography>;

export default Feedback;