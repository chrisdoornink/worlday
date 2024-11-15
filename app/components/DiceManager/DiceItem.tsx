import { Box, Button, Dialog, FormControl, TextField } from "@mui/material";
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
  const [displayValue, setDisplayValue] = useState(
    die.values[die.currentValue] || die.currentValue + 1
  );
  const [rotationDeg, setRotationDeg] = useState(0);

  useEffect(() => {
    if (rolling) {
      // Simple rotation animation while rolling
      const interval = setInterval(() => {
        setRotationDeg(prev => (prev + 45) % 360);
        // Cycle through values while rolling
        setDisplayValue(die.values[Math.floor(Math.random() * die.values.length)]);
      }, 100);

      return () => {
        clearInterval(interval);
        // Reset rotation when rolling stops
        setRotationDeg(0);
        // Show final value
        setDisplayValue(die.values[die.currentValue] || die.currentValue + 1);
      };
    }
  }, [rolling, die.values, die.currentValue]);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newSides = parseInt(formData.get("sides") as string) || die.sides;
    const values = formData.get("values") as string;
    const newValues = values ? values.split(",").map(v => v.trim()) : [];

    while (newValues.length < newSides) {
      newValues.push((newValues.length + 1).toString());
    }

    onUpdate({ ...die, sides: newSides, values: newValues });
    setOpen(false);
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          fontSize: "0.75rem",
          color: "text.secondary",
          position: "absolute",
          top: 8,
          left: 8,
        }}
      >
        {die.name}
      </Box>
      
      <Box
        sx={{
          width: 80,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          border: "2px solid",
          borderColor: "primary.main",
          borderRadius: die.sides === 2 ? "50%" : 2,
          transform: `rotate(${rotationDeg}deg)`,
          transition: "transform 0.1s ease-in-out",
        }}
      >
        {displayValue}
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => onDelete(die)}
        >
          Delete
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <TextField
              name="sides"
              label="Number of Sides"
              type="number"
              defaultValue={die.sides}
              inputProps={{ min: 1, max: 100 }}
            />
          </FormControl>
          <FormControl>
            <TextField
              name="values"
              label="Values (comma-separated)"
              defaultValue={die.values.join(", ")}
              helperText="Leave empty for default values"
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DiceItem;
