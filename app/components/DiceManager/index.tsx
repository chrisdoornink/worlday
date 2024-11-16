"use client";

// components/DiceManager.js
import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DiceItem, { Dice } from "./DiceItem";

interface DicePreset {
  id: string;
  name: string;
  dice: Dice[];
}

const DEFAULT_DICE = {
  name: "Dice",
  sides: 6,
  values: ["1", "2", "3", "4", "5", "6"],
  currentValue: 1,
};

const DiceManager = () => {
  const [dice, setDice] = useState<Dice[]>(() => {
    const savedDice = localStorage.getItem("currentDice");
    return savedDice ? JSON.parse(savedDice) : [];
  });

  const [presets, setPresets] = useState<DicePreset[]>(() => {
    const savedPresets = localStorage.getItem("dicePresets");
    return savedPresets ? JSON.parse(savedPresets) : [];
  });

  const [savePresetOpen, setSavePresetOpen] = useState(false);
  const [loadPresetOpen, setLoadPresetOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");

  const [rolling, setRolling] = useState(false);
  const [rollTime, setRollTime] = useState(2000);

  React.useEffect(() => {
    localStorage.setItem("currentDice", JSON.stringify(dice));
  }, [dice]);

  React.useEffect(() => {
    localStorage.setItem("dicePresets", JSON.stringify(presets));
  }, [presets]);

  const addDice = () => {
    setDice([...dice, { ...DEFAULT_DICE, id: uuidv4() }]);
  };

  const updateDice = (updatedDie: Dice) => {
    const newDiceList = dice.map((die) => (die.id === updatedDie.id ? updatedDie : die));
    setDice(newDiceList);
  };

  const deleteDice = (die: Dice) => {
    const newDiceList = [...dice];
    newDiceList.splice(newDiceList.indexOf(die), 1);
    setDice(newDiceList);
  };

  const savePreset = () => {
    if (newPresetName.trim()) {
      const newPreset: DicePreset = {
        id: uuidv4(),
        name: newPresetName.trim(),
        dice: [...dice]
      };
      setPresets([...presets, newPreset]);
      setSavePresetOpen(false);
      setNewPresetName("");
    }
  };

  const loadPreset = (preset: DicePreset) => {
    setDice([...preset.dice]);
    setLoadPresetOpen(false);
  };

  const deletePreset = (presetId: string) => {
    setPresets(presets.filter(p => p.id !== presetId));
  };

  const rollDice = () => {
    setRolling(true);
    const updatedDice = dice.map((die) => {
      const randomIndex = Math.floor(Math.random() * die.values.length);
      return { ...die, currentValue: randomIndex };
    });
    setTimeout(() => {
      setRolling(false);
      setDice(updatedDice);
    }, rollTime);
  };

  return (
    <Container>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={addDice}>Add Dice</Button>
        <Button variant="contained" onClick={() => setSavePresetOpen(true)} startIcon={<SaveIcon />}>
          Save Preset
        </Button>
        <Button variant="contained" onClick={() => setLoadPresetOpen(true)}>
          Load Preset
        </Button>
        <Button variant="contained" color="primary" onClick={rollDice} disabled={rolling || dice.length === 0}>
          Roll All
        </Button>
      </Box>

      <Dialog open={savePresetOpen} onClose={() => setSavePresetOpen(false)}>
        <DialogTitle>Save Preset</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Preset Name"
            fullWidth
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSavePresetOpen(false)}>Cancel</Button>
          <Button onClick={savePreset} disabled={!newPresetName.trim()}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loadPresetOpen} onClose={() => setLoadPresetOpen(false)}>
        <DialogTitle>Load Preset</DialogTitle>
        <DialogContent>
          <List>
            {presets.map((preset) => (
              <ListItem
                key={preset.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deletePreset(preset.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={preset.name}
                  secondary={`${preset.dice.length} dice`}
                  onClick={() => loadPreset(preset)}
                  sx={{ cursor: 'pointer' }}
                />
              </ListItem>
            ))}
            {presets.length === 0 && (
              <ListItem>
                <ListItemText primary="No presets saved yet" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoadPresetOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        {dice.map((die) => (
          <Grid item key={die.id} xs={12} sm={6} md={4} lg={3}>
            <DiceItem die={die} onUpdate={updateDice} onDelete={deleteDice} rolling={rolling} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ 
        mt: 4, 
        pt: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => setRollTime(Math.max(1000, rollTime - 1000))}
          disabled={rollTime <= 1000}
        >
          Faster Roll
        </Button>
        <Box sx={{ 
          px: 2,
          color: 'text.secondary',
          fontSize: '0.875rem'
        }}>
          Roll Time: {rollTime / 1000}s
        </Box>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => setRollTime(Math.min(10000, rollTime + 1000))}
          disabled={rollTime >= 10000}
        >
          Slower Roll
        </Button>
      </Box>
    </Container>
  );
};

export default DiceManager;
