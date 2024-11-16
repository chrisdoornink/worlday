"use client";

import React, { use, useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton, Divider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import DiceItem from "./DiceItem";
import { RollHistoryDrawer } from "./RollHistory";
import type { RollHistoryItem } from "./RollHistory";
import { DEFAULT_DICE, DEFAULT_PRESETS, type Dice, type DicePreset } from "./constants";

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

  const [historyOpen, setHistoryOpen] = useState(false);
  const [rollHistory, setRollHistory] = useState<RollHistoryItem[]>(() => {
    const savedHistory = localStorage.getItem("rollHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("currentDice", JSON.stringify(dice));
  }, [dice]);

  React.useEffect(() => {
    localStorage.setItem("dicePresets", JSON.stringify(presets));
  }, [presets]);

  React.useEffect(() => {
    localStorage.setItem("rollHistory", JSON.stringify(rollHistory));
  }, [rollHistory]);

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
    setDice(preset.dice.map(die => ({ ...die, id: uuidv4() })));
    setLoadPresetOpen(false);
  };

  const deletePreset = (presetId: string) => {
    setPresets(presets.filter(p => p.id !== presetId));
  };

  const rollDice = () => {
    setRolling(true);
    
    setTimeout(() => {
      const updatedDice = dice.map((die) => {
        const randomIndex = Math.floor(Math.random() * die.values.length);
        return { ...die, currentValue: randomIndex };
      });

      setRolling(false);
      setDice(updatedDice);
    }, rollTime);
  };

  useEffect(() => {
    setRollHistory((prevHistory) => [
      ...dice.map((die) => ({
        id: uuidv4(),
        dieName: die.name,
        value: die.values[die.currentValue],
        timestamp: Date.now(),
      })),
      ...prevHistory,
    ]);
  }, [dice]);

  const clearHistory = () => {
    setRollHistory([]);
  };

  return (
    <Container>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={addDice}>Add Dice</Button>
        <Button variant="outlined" onClick={() => setSavePresetOpen(true)}>
          Save Preset
        </Button>
        <Button variant="outlined" onClick={() => setLoadPresetOpen(true)}>
          Load Preset
        </Button>
        <Button variant="contained" color="primary" onClick={rollDice} disabled={rolling || dice.length === 0}>
          Roll All
        </Button>
        <Button
          variant="outlined"
          onClick={() => setHistoryOpen(true)}
          startIcon={<HistoryIcon />}
        >
          History
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
            {/* User presets first */}
            {presets.map((preset) => (
              <ListItem
                key={preset.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deletePreset(preset.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Button onClick={() => loadPreset(preset)}>
                      {preset.name}
                    </Button>
                  }
                />
              </ListItem>
            ))}
            
            {/* Divider if there are both user presets and we're showing defaults */}
            {presets.length > 0 && <Divider sx={{ my: 1 }}>Default Presets</Divider>}
            
            {/* Default presets */}
            {DEFAULT_PRESETS.map((preset) => (
              <ListItem key={preset.id}>
                <ListItemText
                  primary={
                    <Button onClick={() => loadPreset(preset)}>
                      {preset.name}
                    </Button>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoadPresetOpen(false)}>Cancel</Button>
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

      <RollHistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onClear={clearHistory}
        history={rollHistory}
      />
    </Container>
  );
};

export default DiceManager;
