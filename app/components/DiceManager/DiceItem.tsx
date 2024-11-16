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
    const values = formData.get("values") as string;
    const newValues = values ? values.split(",").map(v => v.trim()) : [];

    // Ensure we have at least one value
    if (newValues.length === 0) {
      newValues.push("1");
    }

    onUpdate({ 
      ...die, 
      sides: newValues.length,
      values: newValues 
    });
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
          perspective: "200px",
          position: "relative"
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: rolling ? 
              `rotateX(${rotationDeg}deg) rotateY(${rotationDeg * 1.5}deg)` : 
              "rotateX(-10deg) rotateY(15deg)",
            transition: "transform 0.1s ease-in-out",
          }}
        >
          {/* Front face */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: (theme) => {
                const length = displayValue.toString().length;
                if (length <= 2) return "2rem";
                if (length <= 4) return "1.5rem";
                if (length <= 6) return "1.25rem";
                if (length <= 8) return "1rem";
                if (length <= 10) return "0.875rem";
                return "0.75rem";
              },
              fontWeight: "bold",
              backgroundColor: "#FFFFF5",
              color: "#444444",
              textShadow: "0px 1px 0px rgba(255,255,255,.5), 0px -1px 0px rgba(0,0,0,.3)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)",
              transform: "translateZ(40px)",
              backfaceVisibility: "hidden"
            }}
          >
            {displayValue}
          </Box>

          {/* Back face */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "inherit",
              fontWeight: "bold",
              backgroundColor: "#FFFFF5",
              color: "#444444",
              textShadow: "0px 1px 0px rgba(255,255,255,.5), 0px -1px 0px rgba(0,0,0,.3)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)",
              transform: "translateZ(-40px) rotateY(180deg)",
              backfaceVisibility: "hidden"
            }}
          >
            {displayValue}
          </Box>

          {/* Right face */}
          <Box
            sx={{
              position: "absolute",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "inherit",
              fontWeight: "bold",
              backgroundColor: "#F5F5EA", 
              color: "#444444",
              textShadow: "0px 1px 0px rgba(255,255,255,.5), 0px -1px 0px rgba(0,0,0,.3)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)",
              transform: "rotateY(90deg) translateZ(40px)",
              backfaceVisibility: "hidden"
            }}
          >
            {displayValue}
          </Box>

          {/* Left face */}
          <Box
            sx={{
              position: "absolute",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "inherit",
              fontWeight: "bold",
              backgroundColor: "#F5F5EA", 
              color: "#444444",
              textShadow: "0px 1px 0px rgba(255,255,255,.5), 0px -1px 0px rgba(0,0,0,.3)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)",
              transform: "rotateY(-90deg) translateZ(40px)",
              backfaceVisibility: "hidden"
            }}
          >
            {displayValue}
          </Box>

          {/* Top face */}
          <Box
            sx={{
              position: "absolute",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "inherit",
              fontWeight: "bold",
              backgroundColor: "#F5F5EA", 
              color: "#444444",
              textShadow: "0px 1px 0px rgba(255,255,255,.5), 0px -1px 0px rgba(0,0,0,.3)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)",
              transform: "rotateX(90deg) translateZ(40px)",
              backfaceVisibility: "hidden"
            }}
          >
            {displayValue}
          </Box>

          {/* Bottom face */}
          <Box
            sx={{
              position: "absolute",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "inherit",
              fontWeight: "bold",
              backgroundColor: "#F5F5EA", 
              color: "#444444",
              textShadow: "0px 1px 0px rgba(255,255,255,.5), 0px -1px 0px rgba(0,0,0,.3)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)",
              transform: "rotateX(-90deg) translateZ(40px)",
              backfaceVisibility: "hidden"
            }}
          >
            {displayValue}
          </Box>
        </Box>
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
              name="values"
              label="Values (comma-separated)"
              defaultValue={die.values.join(", ")}
              helperText="Enter values separated by commas (e.g., '1, 2, 3' or 'Yes, No, Maybe')"
              multiline
              rows={2}
              fullWidth
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
