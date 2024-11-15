import { Box, Button, Dialog, FormControl, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface DiceItemProps {
  die: Dice;
  onUpdate: (die: Dice) => void;
  onDelete: (die: Dice) => void;
  rolling: boolean;
}

export interface Dice {
  id: string;
  name: string;
  sides: number;
  values: string[];
  currentValue: number;
}

const DiceItem: React.FC<DiceItemProps> = ({ die, onUpdate, onDelete, rolling }) => {
  const [open, setOpen] = useState(false);

  const editDie = () => {
    setOpen(true);
  };

  const updateDie = (updatedDie: Dice) => {
    onUpdate(updatedDie);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateDieValues = (index: number, value: string) => {
    const updatedValues = [...die.values];
    updatedValues[index] = value;
    onUpdate({ ...die, values: updatedValues });
  };

  const handleSidesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if we add sides, they must be named, give them the dice name and side index as default
    // but preserve the existing sides
    // we can get the number of NEW sides by comparing to the existing length of the values property
    const oldSides = die.values.length;
    const newSides = parseInt(e.target.value);

    let newValues = die.values;
    if (newSides > oldSides) {
      const newLabels = Array(newSides - oldSides).fill(`Side-${oldSides + 1}`);
      newValues = die.values.concat(newLabels);
    } else {
      newValues = die.values.slice(0, newSides);
    }

    onUpdate({ ...die, sides: newSides, values: newValues });
  };

  // const displayValue = die.values[die.currentValue] || die.currentValue + 1;
  const [displayValue, setDisplayValue] = useState(
    die.values[die.currentValue] || die.currentValue + 1
  );
  useEffect(() => {
    // if rolling is true, we want to cycle through the values of the die in a quick loop
    // that slows down as the roll time increases. Once rolling is false, we want to show
    // the current value again.
    if (rolling) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayValue(die.values[index % die.values.length]);
        index++;
      }, 100);
      return () => clearInterval(interval);
    } else {
      setDisplayValue(die.values[die.currentValue] || die.currentValue + 1);
    }
  }, [rolling]);

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "background.paper",
        minWidth: 200,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        position: "relative",
        "&:hover .action-buttons": {
          visibility: "visible",
        },
        fontFamily: 'sans-serif'
      }}
    >
      <Box sx={{ 
        position: 'absolute',
        top: 8,
        left: 8,
        color: 'text.disabled',
        fontSize: '0.875rem',
        fontFamily: 'sans-serif'
      }}>
        {die.name}
      </Box>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={8} sx={{ fontFamily: 'sans-serif' }}>
          {displayValue}
        </Grid>
        <Grid item xs={12} sm={4} container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <Button sx={{ visibility: "hidden" }} className="action-buttons" onClick={editDie}>
              Update
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ visibility: "hidden" }}
              className="action-buttons"
              variant="contained"
              color="error"
              onClick={() => onDelete(die)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
          <FormControl>
            <TextField
              label="Name"
              value={die.name}
              onChange={(e) => updateDie({ ...die, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <TextField type="number" label="Sides" value={die.sides} onChange={handleSidesChange} />
          </FormControl>
          {die.sides > 0 &&
            die.values.map((value, index) => (
              <FormControl key={index}>
                <TextField
                  label={`Label ${index + 1}`}
                  value={value}
                  onChange={(e) => updateDieValues(index, e.target.value)}
                />
              </FormControl>
            ))}
        </Box>
      </Dialog>
    </Box>
  );
};

export default DiceItem;
