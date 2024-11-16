import { v4 as uuidv4 } from "uuid";

export interface Dice {
  id: string;
  name: string;
  sides: number;
  values: string[];
  currentValue: number;
}

export interface DicePreset {
  id: string;
  name: string;
  dice: Dice[];
  isDefault?: boolean;
}

export const DEFAULT_DICE: Dice = {
  id: "",
  name: "New Die",
  sides: 6,
  values: ["1", "2", "3", "4", "5", "6"],
  currentValue: 0,
};

export const DEFAULT_PRESETS: DicePreset[] = [
  {
    id: "yahtzee",
    name: "Yahtzee",
    isDefault: true,
    dice: Array(5).fill(null).map(() => ({
      ...DEFAULT_DICE,
      id: uuidv4(),
      name: "D6",
      sides: 6,
      values: ["1", "2", "3", "4", "5", "6"],
    })),
  },
  {
    id: "dnd",
    name: "D&D Basic Set",
    isDefault: true,
    dice: [
      {
        ...DEFAULT_DICE,
        id: uuidv4(),
        name: "D20",
        sides: 20,
        values: Array.from({ length: 20 }, (_, i) => (i + 1).toString()),
      },
      {
        ...DEFAULT_DICE,
        id: uuidv4(),
        name: "D12",
        sides: 12,
        values: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
      },
      {
        ...DEFAULT_DICE,
        id: uuidv4(),
        name: "D10",
        sides: 10,
        values: Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
      },
      {
        ...DEFAULT_DICE,
        id: uuidv4(),
        name: "D8",
        sides: 8,
        values: Array.from({ length: 8 }, (_, i) => (i + 1).toString()),
      },
      {
        ...DEFAULT_DICE,
        id: uuidv4(),
        name: "D6",
        sides: 6,
        values: ["1", "2", "3", "4", "5", "6"],
      },
      {
        ...DEFAULT_DICE,
        id: uuidv4(),
        name: "D4",
        sides: 4,
        values: ["1", "2", "3", "4"],
      },
    ],
  },
  {
    id: "monopoly",
    name: "Monopoly",
    isDefault: true,
    dice: Array(2).fill(null).map(() => ({
      ...DEFAULT_DICE,
      id: uuidv4(),
      name: "D6",
      sides: 6,
      values: ["1", "2", "3", "4", "5", "6"],
    })),
  },
];
