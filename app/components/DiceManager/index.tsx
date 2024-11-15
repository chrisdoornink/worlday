"use client";

// components/DiceManager.js
import React, { useState } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DiceItem, { Dice } from "./DiceItem";

const DEFAULT_DICE = {
  name: "Dice",
  sides: 6,
  values: ["1", "2", "3", "4", "5", "6"],
  currentValue: 1,
};

const DiceManager = () => {
  const [dice, setDice] = useState<Dice[]>(() => {
    const savedDice = localStorage.getItem("dice");
    return savedDice ? JSON.parse(savedDice) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("dice", JSON.stringify(dice));
  }, [dice]);

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

  const [rolling, setRolling] = useState(false);
  const [rollTime, setRollTime] = useState(3000);

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
    <>
      <Button onClick={addDice}>Add Dice</Button>
      <Grid container spacing={2}>
        {dice.map((die) => (
          <Grid item key={die.id} xs={12} sm={6} md={4} lg={3}>
            <DiceItem die={die} onUpdate={updateDice} onDelete={deleteDice} rolling={rolling} />
          </Grid>
        ))}
      </Grid>
      <Button onClick={rollDice}>Roll Dice</Button>
      <Button onClick={() => setRollTime(rollTime + 1000)}>Increase Roll Time</Button>
      <Button onClick={() => setRollTime(rollTime - 1000)}>Decrease Roll Time</Button>
    </>
  );
};

export default DiceManager;
